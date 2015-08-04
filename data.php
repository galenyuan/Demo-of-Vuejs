<?php
	$dsn = "mysql:host=localhost;dbname=vuejs";
	$db = new PDO($dsn,'root','');
	$db->query('set names utf8;');
	$action = $_GET['action'];
	call_user_func($action);
	function select(){
		global $dsn,$db;
		$rs = $db->query("SELECT * FROM data");
		$API = array();
		$row = $rs->fetchAll();
		for($i=0;$i<count($row);$i++){
			$API[$i]['id'] = $row[$i]['id'];
			$API[$i]['msg'] = $row[$i]['msg'];
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
	}
	function insert(){
		global $dsn,$db,$data;
		$data = $_POST['data'];
		$data = json_decode($data);
		for($i=0;$i<count($data);$i++){
			$id = $data[$i]->id;
			$msg = $data[$i]->msg;
			$picked = $data[$i]->picked;
			$checked = $data[$i]->checked;
			if($checked){
				$checked = 1;
			}else{
				$checked = 0;
			}
			$selected = $data[$i]->selected;
			$multiSelect = $data[$i]->multiSelect;
			$multiSelect = implode(',' , $multiSelect);
			if($id!=''){
				$id = (int)$id;
				$sql = "update data set msg = '$msg', checked = '$checked', selected = '$selected', multiSelect = '$multiSelect' where id = '$id'";
				$count = $db->exec($sql);
				echo $count;
			}else{
				$count = $db->exec("INSERT INTO data(msg, checked, selected, multiSelect) VALUES ('$msg', '$checked', '$selected', '$multiSelect')");
				echo $count;
			}
		}
		$db = null;
	}
	function delete(){
		global $dsn,$db,$data;
		$id = $_GET['id'];
		$id = (int)$id;
		$db->exec("DELETE FROM data WHERE id = '$id'");
	}
	
?>