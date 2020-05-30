<?php

	header('Access-Control-Allow-Origin: *');
	$levelcount = 9;

	if ($_POST['action'] == 'sendMyScore') {
		echo md5('salt'.$_POST['myScore']);
	} else if ($_POST['action'] == 'validMyScore') {
		if ($_POST['code'] == md5('salt'.$_POST['myScore'])) {
			$scores = json_decode($_POST['myScore']);
			$sum = array_sum( $scores );
			$name = empty( $_POST['name'] ) ? 'Namenlos' : $_POST['name'];

			foreach( $scores as $s ) if( $s < 5000 ) exit();
			if( count( $scores ) < $levelcount ) exti();

			include 'database.php';
			mysql_query('INSERT INTO scores (score, name) VALUES ('.intval($sum).', \''.mysql_real_escape_string($name).'\')');
		}
	}
