<?php

/*
 * This file is part of the Jejik\MT940 library
 *
 * Copyright (c) 2012 Sander Marechal <s.marechal@jejik.com>
 * Licensed under the MIT license
 *
 * For the full copyright and license information, please see the LICENSE
 * file that was distributed with this source code.
 */

namespace Jejik\MT940\Parser;

use Jejik\MT940\Balance;
use Jejik\MT940\AccountInterface;
use Jejik\MT940\BalanceInterface;
use Jejik\MT940\StatementInterface;
use Jejik\MT940\Reader;
use Jejik\MT940\Statement;
use Jejik\MT940\Transaction;

/**
 * Base MT940 parser
 *
 * @author Sander Marechal <s.marechal@jejik.com>
 */
abstract class AbstractParser
{
    // Properties {{{

    /**
     * Reference to the MT940 reader
     *
     * @var Reader
     */
    protected $reader;

    // }}}

    /**
     * Constructor
     *
     * @param Reader $reader Reference to the MT940 reader
     */
    public function __construct(Reader $reader)
    {
        $this->reader = $reader;
    }

    /**
     * Parse an MT940 document
     *
     * @param string $text Full document text
     * @return array An array of \Jejik\MT940\Statement
     */
    public function parse($text)
    {
        $statements = array();
        foreach ($this->splitStatements($text) as $chunk) {
            if ($statement = $this->statement($chunk)) {
                $statements[] = $statement;
            }
        }

        return $statements;
    }

    /**
     * Get the contents of an MT940 line
     *
     * The contents may be several lines long (e.g. :86: descriptions)
     *
     * @param string $id The line ID (e.g. "20"). Can be a regular expression (e.g. "60F|60M")
     * @param string $text The text to search
     * @param int $offset The offset to start looking
     * @param int $position Starting position of the found line
     * @param int $length Length of the found line (before trimming), including EOL
     * @return string
     */
    protected function getLine($id, $text, $offset = 0, &$position = null, &$length = null)
    {
        $pcre = '/(?:^|\r?\n)\:(' . $id . ')\:'   // ":<id>:" at the start of a line
              . '(.+)'                           // Contents of the line
              . '(:?$|\r?\n\:[[:alnum:]]{2,3}\:)' // End of the text or next ":<id>:"
              . '/Us';                           // Ungreedy matching

        // Offset manually, so the start of the offset can match ^
        if (preg_match($pcre, substr($text, $offset), $match, PREG_OFFSET_CAPTURE)) {
            $position = $offset + $match[1][1] - 1;
            $length = strlen($match[2][0]);
            return rtrim($match[2][0]);
        }

        return '';
    }

    /**
     * Split the text into separate statement chunks
     *
     * @param string $text Full document text
     * @return array Array of statement texts
     * @throws \RuntimeException if the statementDelimiter is not set
     */
    protected function splitStatements($text)
    {
        $chunks = preg_split('/^:20:/m', $text, -1);
        $chunks = array_filter(array_map('trim', array_slice($chunks, 1)));

        // Re-add the :20: at the beginning
        return array_map(function ($statement) {
            return ':20:' . $statement;
        }, $chunks);
    }

    /**
     * Split transactions and their descriptions from the statement text
     *
     * Returns a nexted array of transaction lines. The transaction line text
     * is at offset 0 and the description line text (if any) at offset 1.
     *
     * @param string $text Statement text
     * @return array Nested array of transaction and description lines
     */
    protected function splitTransactions($text)
    {
        $offset = 0;
        $length = 0;
        $position = 0;
        $transactions = array();

        while ($line = $this->getLine('61', $text, $offset, $offset, $length)) {
            $offset += 4 + $length + 2;
            $transaction = array($line);

            // See if the next description line belongs to this transaction line.
            // The description line should immediately follow the transaction line.
            $description = array();
            while ($line = $this->getLine('86', $text, $offset, $position, $length)) {
                if ($position == $offset) {
                    $offset += 4 + $length + 2;
                    $description[] = $line;
                } else {
                    break;
                }
            }

            if ($description) {
                $transaction[] = implode("\r\n", $description);
            }

            $transactions[] = $transaction;
        }

        return $transactions;
    }

    /**
     * Parse a statement chunk
     *
     * @param string $text Statement text
     * @return \Jejik\MT940\Statement
     * @throws \RuntimeException if the chunk cannot be parsed
     */
    protected function statement($text)
    {
        $text = trim($text);
        if (($pos = strpos($text, ':20:')) === false) {
            throw new \RuntimeException('Not an MT940 statement');
        }

        $this->statementHeader(substr($text, 0, $pos));
        return $this->statementBody(substr($text, $pos));
    }

    /**
     * Parse a statement header
     *
     * @param string $text Statement header text
     * @return void
     */
    protected function statementHeader($text)
    {
    }

    /**
     * Parse a statement body
     *
     * @param string $text Statement body text
     * @return \Jejik\MT940\Statement
     */
    protected function statementBody($text)
    {
        $accountNumber = $this->accountNumber($text);
        $account = $this->reader->createAccount($accountNumber);

        if (!($account instanceof AccountInterface)) {
            return null;
        }

        $account->setNumber($accountNumber);
        $number = $this->statementNumber($text);
        $statement = $this->reader->createStatement($account, $number);

        if (!($statement instanceof StatementInterface)) {
            return null;
        }

        $statement->setAccount($account)
                  ->setNumber($this->statementNumber($text))
                  ->setOpeningBalance($this->openingBalance($text))
                  ->setClosingBalance($this->closingBalance($text));

        foreach ($this->splitTransactions($text) as $chunk) {
            $statement->addTransaction($this->transaction($chunk));
        }

        return $statement;
    }

    /**
     * Parse a statement number
     *
     * @param string $text Statement body text
     * @return string|null
     */
    protected function statementNumber($text)
    {
        if ($number = $this->getLine('28|28C', $text)) {
            return $number;
        }

        return null;
    }

    /**
     * Parse an account number
     *
     * @param string $text Statement body text
     * @return string|null
     */
    protected function accountNumber($text)
    {
        if ($account = $this->getLine('25', $text)) {
            return ltrim($account, '0');
        }

        return null;
    }

    /**
     * Fill a Balance object from an MT940  balance line
     *
     * @param BalanceInterface $balance
     * @param string $text
     * @return \Jejik\MT940\Balance
     */
    protected function balance(BalanceInterface $balance, $text)
    {
        if (!preg_match('/(C|D)(\d{6})([A-Z]{3})([0-9,]{1,15})/', $text, $match)) {
            throw new \RuntimeException(sprintf('Cannot parse balance: "%s"', $text));
        }

        $amount = (float) str_replace(',', '.', $match[4]);
        if ($match[1] === 'D') {
            $amount *= -1;
        }

        $date = \DateTime::createFromFormat('ymd', $match[2]);
        $date->setTime(0, 0, 0);

        $balance->setCurrency($match[3])
                ->setAmount($amount)
                ->setDate($date);

        return $balance;
    }

    /**
     * Get the opening balance
     *
     * @param mixed $text
     * @return \Jejik\MT940\Balance
     */
    protected function openingBalance($text)
    {
        if ($line = $this->getLine('60F|60M', $text)) {
            return $this->balance($this->reader->createOpeningBalance(), $line);
        }
    }

    /**
     * Get the closing balance
     *
     * @param mixed $text
     * @return \Jejik\MT940\Balance
     */
    protected function closingBalance($text)
    {
        if ($line = $this->getLine('62F|62M', $text)) {
            return $this->balance($this->reader->createClosingBalance(), $line);
        }
    }

    /**
     * Create a Transaction from MT940 transaction text lines
     *
     * @param array $lines The transaction text at offset 0 and the description at offset 1
     * @return \Jejik\MT940\Transaction
     */
    protected function transaction(array $lines)
    {
			
        if (!preg_match('/(\d{6})((\d{2})(\d{2}))?(C|D)([A-Z]?)([0-9,]{1,15})/', $lines[0], $match)) {
            throw new \RuntimeException(sprintf('Could not parse transaction line "%s"', $lines[0]));
        }

        // Parse the amount
        $amount = (float) str_replace(',', '.', $match[7]);
        if ($match[5] === 'D') {
            $amount *= -1;
        }

        // Parse dates
        $valueDate = \DateTime::createFromFormat('ymd', $match[1]);
        $valueDate->setTime(0, 0, 0);

        $bookDate = null;

        if ($match[2]) {
            // Construct book date from the month and day provided by adding the year of the value date as best guess.
            $month = intval($match[3]);
            $day = intval($match[4]);
            $bookDate = $this->getNearestDateTimeFromDayAndMonth($valueDate, $day, $month);
        }

        $description = isset($lines[1]) ? $lines[1] : null;
        $transaction = $this->reader->createTransaction();
        $transaction->setAmount($amount)
                    ->setContraAccount($this->contraAccount($lines))
                    ->setValueDate($valueDate)
                    ->setBookDate($bookDate)
                    ->setDescription($this->description($description));

        return $transaction;
    }

    /**
     * Finds the closest \DateTime to the given target \DateTime with the set day and month.
     * Will try at most 3 \Datetime's, one a year before our initial guess, and one a year after.
     * Returns the one with the least days difference in days.
     *
     * @param \DateTime $target
     * @param int $day
     * @param int $month
     * @return \DateTime
     */
    protected function getNearestDateTimeFromDayAndMonth(\DateTime $target, $day, $month)
    {
        $initialGuess = new \DateTime();
        $initialGuess->setDate($target->format('Y'), $month, $day);
        $initialGuess->setTime(0, 0, 0);
        $initialGuessDiff = $target->diff($initialGuess);

        $yearEarlier = clone $initialGuess;
        $yearEarlier->modify('-1 year');
        $yearEarlierDiff = $target->diff($yearEarlier);

        if ($yearEarlierDiff->days < $initialGuessDiff->days) {
            return $yearEarlier;
        }

        $yearLater = clone $initialGuess;
        $yearLater->modify('+1 year');
        $yearLaterDiff = $target->diff($yearLater);

        if ($yearLaterDiff->days < $initialGuessDiff->days) {
            return $yearLater;
        }

        return $initialGuess;
    }

    /**
     * Get the contra account from a transaction
     *
     * @param array $lines The transaction text at offset 0 and the description at offset 1
     * @return \Jejik\MT940\AccountInterface|null
     */
    protected function contraAccount(array $lines)
    {
        $number = $this->contraAccountNumber($lines);
        $name = $this->contraAccountName($lines);

        if ($name || $number) {
            $contraAccount = $this->reader->createContraAccount($number);
            $contraAccount->setNumber($number)
                          ->setName($name);

            return $contraAccount;
        }

        return null;
    }

    /**
     * Get the contra account number from a transaction
     *
     * @param array $lines The transaction text at offset 0 and the description at offset 1
     * @return string|null
     */
    protected function contraAccountNumber(array $lines)
    {
        return null;
    }

    /**
     * Get the contra account holder name from a transaction
     *
     * @param array $lines The transaction text at offset 0 and the description at offset 1
     * @return string|null
     */
    protected function contraAccountName(array $lines)
    {
        return null;
    }

    /**
     * Process the description
     *
     * @param string $description
     * @return string
     */
    protected function description($description)
    {
        return $description;
    }

    /**
     * Test if the document can be read by the parser
     *
     * @param string $text
     * @return bool
     */
    abstract public function accept($text);
}
