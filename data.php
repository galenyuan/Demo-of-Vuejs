<?php
	$dsn = "mysql:host=localhost;dbname=vuejs";
	$db = new PDO($dsn, 'root', '');
	$rs = $db->query("SELECT * FROM data");
	$API = array();
	$row = $rs->fetchAll();
	for($i=0;$i<count($row);$i++){
		$API[$i]['msg'] = $row[$i]['msg'];
		$API[$i]['picked'] = $row[$i]['picked']; 
		$API[$i]['checked'] = $row[$i]['checked'];
		$API[$i]['selected'] = $row[$i]['selected'];
		$API[$i]['multiSelect'] = $row[$i]['multiSelect']; 
		$API[$i]['multiSelect'] = explode(",",$API[$i]['multiSelect']);
		switch ($API[$i]['checked']) {
			case 1:
				$API[$i]['checked'] = true;
				break;	
			case 0:
				$API[$i]['checked'] = false;
				break;
		}
	}
	echo json_encode($API);
	$db = null;
?>