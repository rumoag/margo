<?php
// Variables
$hostDB = 'margo_db.sqlite';
// Conecta con base de datos
$hostPDO = "sqlite:$hostDB";
$miPDO = new PDO($hostPDO);
