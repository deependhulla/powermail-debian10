<?php
///**
// * This script converts the project report template tables from v3.7 to v4.0
// * style. It assumes that pr2_report_templates currently contains the information
// * needed to use both pdf and odf templates. It's purpose is to copy the
// * template type-specific fields from that table to eitherpr2_report_template_pdf
// * or pr2_report_template_odf.
// * @author: Wilmar van Beusekom <wilmar@intermesh.nl>
// */
//
//echo "=== Update script 1_convert_report_templates.inc.php: ===\n";
//
//$dbConn = \GO::getDbConnection();
//
//$stmtCheck = $dbConn->query("SHOW COLUMNS FROM `pr2_report_templates`");
//$tableIsOldStyle = true;
//while ($col = $stmtCheck->fetch(PDO::FETCH_ASSOC)) {
//	switch($col['Field']) {
//		case 'fields':
//		case 'header':
//		case 'footer':
//		case 'image':
//		case 'odf_extension':
//			$tableIsOldStyle = true;
//			break;		
//	}
//}
//
//if (!$tableIsOldStyle) {
//	echo "table pr2_report_templates has already been converted, skipping conversion...\n";
//} else {
//	echo "Starting conversion...\n";
//	$stmtFrom = $dbConn->query("SELECT * FROM `pr2_report_templates`;");
//	if (!empty($stmtFrom)) {
//		$pdfFields = array(
//				"`template_id`",
//				"`fields`",
//				"`header`",
//				"`footer`",
//				"`image`",
//				"`img_top`",
//				"`img_left`",
//				"`img_width`",
//				"`img_height`",
//				"`no_page_breaks`",
//				"`l_margin`",
//				"`t_margin`",
//				"`r_margin`",
//				"`b_margin`",
//				"`final_page_template`",
//			);
//		$odfFields = array_merge($pdfFields,array("`odf_extension`"));
//		while ($repTemp = $stmtFrom->fetch(PDO::FETCH_ASSOC)) {
//			if (!empty($repTemp['odf_extension'])) {
//				$stmtTo = $dbConn->query(
//					"INSERT INTO `pr2_report_templates_odf` ".
//					"(".implode(",",$odfFields).") ".
//					"VALUES ('".$repTemp['id']."', ".
//					"'".$repTemp['fields']."','".$repTemp['header']."','".$repTemp['footer']."','".$repTemp['image']."', ".
//					"'".$repTemp['img_top']."','".$repTemp['img_left']."','".$repTemp['img_width']."','".$repTemp['img_height']."','".$repTemp['no_page_breaks']."', ".
//					"'".$repTemp['l_margin']."','".$repTemp['t_margin']."','".$repTemp['r_margin']."','".$repTemp['b_margin']."','".$repTemp['final_page_template']."',".
//					"'".$repTemp['odf_extension']."');"
//				);
//				if (!empty($stmtTo)) {
//					echo "SUCCESS: ODF #".$repTemp['id']." copied to pr2_report_templates_odf.\n";
//				} else {
//					echo "FAILED: ODF #".$repTemp['id']." not copied to pr2_report_templates_odf.\n";
//				}
//				$stmtUpdate = $dbConn->query("UPDATE `pr2_report_templates` SET `type`='odf' WHERE `id`='".$repTemp['id']."';");
//			} else {
//				$stmtTo = $dbConn->query(
//					"INSERT INTO `pr2_report_templates_pdf` ".
//					"(".implode(",",$pdfFields).") ".
//					"VALUES ('".$repTemp['id']."', ".
//					"'".$repTemp['fields']."','".$repTemp['header']."','".$repTemp['footer']."','".$repTemp['image']."', ".
//					"'".$repTemp['img_top']."','".$repTemp['img_left']."','".$repTemp['img_width']."','".$repTemp['img_height']."','".$repTemp['no_page_breaks']."', ".
//					"'".$repTemp['l_margin']."','".$repTemp['t_margin']."','".$repTemp['r_margin']."','".$repTemp['b_margin']."','".$repTemp['final_page_template']."');"
//				);
//				if (!empty($stmtTo)) {
//					echo "SUCCESS: PDF #".$repTemp['id']." copied to pr2_report_templates_pdf.\n";
//				} else {
//					echo "FAILED: PDF #".$repTemp['id']." not copied to pr2_report_templates_pdf.\n";
//				}
//				$stmtUpdate = $dbConn->query("UPDATE `pr2_report_templates` SET `type`='pdf' WHERE `id`='".$repTemp['id']."';");
//			}
//		}
//	} else {
//		echo "Unable to retrieve any records from pr2_report_templates.\n";
//	}
//}
//echo "=== END OF Update script 1_convert_report_templates.inc.php ===\n";
?>
