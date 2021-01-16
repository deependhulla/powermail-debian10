<?php


namespace GO\Projects2\Report;

use GO;
use GO\Base\Db\FindParams;
use GO\Base\Util\Number;
use GO\Base\Util\Date\DateTime;
use GO\Projects2\Model\Expense;
use GO\Projects2\Model\TimeEntry;

class FinanceReport extends AbstractReport
{

	/**
	 * @inheritDoc
	 */
	public function name()
	{
		return GO::t('Finance report', 'projects2');
	}

	/**
	 * @return bool
	 */
	public function supportsBatchReport()
	{
		return true;
	}

	/**
	 * @return false
	 */
	public function supportsSelectedProject()
	{
		return false;
	}

	/**
	 * @inheritDoc
	 */
	public function fileExtension()
	{
		return 'csv';
	}

	/**
	 * @return bool
	 */
	public function supportsDateRange()
	{
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public function render($return = false)
	{
		// Step 0: Prepare the CSV file
		$this->setFilename($this->getFileName());

		$csvFile = \GO\Base\Fs\CsvFile::tempFile($this->filename, $this->fileExtension());

		$arAttrs = array(
			go()->t('path', 'legacy', 'projects2'),
			go()->t('Expenses', 'legacy', 'projects2') . " (" . go()->t('Period', 'legacy', 'projects2') . ")",
			go()->t('Expenses', 'legacy', 'projects2') . " (" . strip_tags(go()->t('Total', 'legacy', 'projects2')) .")",

			go()->t('Expense budget', 'legacy', 'projects2') . " (" . strip_tags(go()->t('Total', 'legacy', 'projects2') ).")",

			go()->t('Time spent', 'legacy', 'projects2') . " (" . go()->t('Period', 'legacy', 'projects2') .")",
			go()->t('Time spent', 'legacy', 'projects2') . " (" . strip_tags(go()->t('Total', 'legacy', 'projects2') ).")",

			go()->t('Time budget', 'legacy', 'projects2') . " (" . strip_tags(go()->t('Total', 'legacy', 'projects2')) .")",

		);

		$csvFile->putRecord($this->translateHeaders($arAttrs));

		// Step 1: Retrieve relevant project IDs
		$conn = GO::getDbConnection();
		$q = <<<SQL
SELECT `t`.`id`,`t`.`name`,`t`.`path`, `r`.`total_budgeted_units` 
FROM `pr2_projects` `t` 
	INNER JOIN (
	SELECT `project_id`, SUM(`budgeted_units`) AS `total_budgeted_units` FROM `pr2_resources` GROUP BY `project_id`
	) `r` ON `t`.`id` = `r`.`project_id`
WHERE `t`.`id` IN (SELECT `project_id` FROM `pr2_hours`) OR `t`.`id` IN (SELECT `project_id` FROM `pr2_resources`)
ORDER BY `t`.`path`;
SQL;

		// Prepared statement for budgets. We'll get there
		$bpq = GO::getDbConnection()->prepare(
			'SELECT SUM(nett) AS total_budget FROM pr2_expense_budgets WHERE project_id = :project_id;'
		);


		// Step 2: for each project ID:
		foreach($conn->query($q) as $row) {
			$projectId = $row['id'];
			$record = [];
			$record[] = $row['path'];


			// 2a. Retrieve all expenses;
			$fp2 = FindParams::newInstance()
				->ignoreAcl()
				->select('t.nett,t.date')
				->order('date');
			$fp2->getCriteria()->addCondition('project_id', $projectId);
			$st2 = Expense::model()->find($fp2);

			$total_expenses = 0;
			$total_period = 0;
			foreach ($st2 as $expEntry) {
				// 2b. Sum all expenses
				$total_expenses += $expEntry->nett;
				if ($expEntry->date >= $this->startDate && $expEntry->date < $this->endDate) {
					// 2c. Filter out current period
					$total_period += $expEntry->nett;
				}
			}
			$record[] = Number::localize($total_period);
			$record[] = Number::localize($total_expenses);

			// 2d. Retrieve all expense_budget, sum netto / nett+tax
			$bpq->execute(['project_id' => $projectId]);
			if ($bprow = $bpq->fetch(\PDO::FETCH_ASSOC)) {
				$record[] = Number::localize($bprow['total_budget']);
			} else {
				$record[] = Number::localize(0);
			};
			$numWorkedHours = 0;
			$numPeriodicalHours = 0;

			// Step 2e: Retrieve worked hours, Step 2f: Filter out the hours for the current period
			$fp2 = FindParams::newInstance()
				->ignoreAcl()
				->select('t.units,t.date')
				->order('t.date');
			$fp2->getCriteria()->addCondition('project_id', $projectId);
			$st2 = TimeEntry::model()->find($fp2);
			foreach ($st2 as $entry) {
				$numWorkedHours += $entry->units;
				if($entry->date >= $this->startDate && $entry->date < $this->endDate) {
					$numPeriodicalHours += $entry->units;
				}
			}
			$record[] = $numPeriodicalHours;
			$record[] = $numWorkedHours;

			// Step 2g: Total budgeted hours for the current project, cunningly retrieved from the initial query
			$record[] = $row['total_budgeted_units'];

			$csvFile->putRecord($record);
		}
		if ($return) {
			return $csvFile->getContents();
		} else {
			\GO\Base\Util\Http::outputDownloadHeaders($csvFile, false);
			$csvFile->output();
		}
	}

	/**
	 * Translate the attributes into user friendly headers
	 *
	 * @param array $attrs
	 * @return array
	 */
	private function translateHeaders(array $attrs)
	{
		$arResult = [];
		foreach ($attrs as $strAttr) {
			$arResult[] = GO::t(ucfirst($strAttr), 'projects2');
		}
		return $arResult;
	}

	/**
	 * Generate a proper file name
	 *
	 * @return string
	 */
	private function getFileName()
	{
		$oDT = DateTime::fromUnixTime($this->startDate);
		$strName = $this->name() . ' ';
		$strName .= $oDT->formatDate() . ' ';
		$oDT = DateTime::fromUnixtime($this->endDate)->sub(new \DateInterval('P1D'));
		$strName .= GO::t("Till", "projects2") . ' ' . $oDT->formatDate();
		return $strName;
	}

}