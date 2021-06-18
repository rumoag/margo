<?php
// Variables
$hostDB = 'apiTravel.sqlite';
// Conecta con base de datos
$hostPDO = "sqlite:$hostDB";
$miPDO = new PDO($hostPDO);
