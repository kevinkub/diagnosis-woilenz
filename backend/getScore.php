<?php

header('Access-Control-Allow-Origin: *');
include 'database.php';

$ergebnis = mysql_query('SELECT * FROM scores ORDER BY score ASC LIMIT 10');

$scores = array();
while($row = mysql_fetch_assoc($ergebnis)) {
	$scores[] = $row;
}

echo json_encode($scores);
