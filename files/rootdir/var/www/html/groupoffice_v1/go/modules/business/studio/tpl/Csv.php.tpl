<?php

namespace {namespace}\convert;

use go\core\data\convert;
use go\core\fs\File;

class Csv extends convert\Csv
{
	/**
	* @param File $file
	* @param string $entityClass
	* @param array $params
	* @return array|bool
	* @throws \Exception
	*/
	public function importFile(File $file, $entityClass, $params = array())
	{
		$result = parent::importFile($file, $entityClass, $params);
		if(!$result['success']) {
			return false;
		}

		return [
			'count' => $result['count'],
			'errors' => $result['errors'],
			'success' => $result['success']
		];
	}
}