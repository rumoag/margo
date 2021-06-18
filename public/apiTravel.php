<?php
require_once ('connect.php');
// Cabecera que indica el tipo de contenido a servir
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        // Recogemos toda la información recibida
        $inputJSON = file_get_contents('php://input');

        // Convertimos la información cruda en un diccionario
        $data = json_decode($inputJSON, true);

        $miInsert = $miPDO->prepare('INSERT INTO travels (image, location, longitud, latitud, date_initial, date_end, money) VALUES (:image, :location, :longitud, :latitud, :date_initial, :date_end, :money);');
        // Ejecuta el nuevo registro en la base de datos
        $miInsert->execute([
            'image' => $data['image'],
            'location' => $data['location'],
            'longitud' => $data['longitud'],
            'latitud' => $data['latitud'],
            'date_initial' => $data['date_initial'],
            'date_end' => $data['date_end'],
            'money' => $data['money'],
        ]);

        echo json_encode(['status'=> 'ok']);
    break;
    case 'PUT':
        // Recogemos toda la información recibida
        $inputJSON = file_get_contents('php://input');

        // Convertimos la información cruda en un diccionario
        $data = json_decode($inputJSON, true);

        $miUpdate = $miPDO->prepare('UPDATE relojes SET marca = :marca, origen = :origen WHERE id = :id');
        // Ejecuta el nuevo registro en la base de datos
        $miUpdate->execute([
            'id' => $data['id'],
            'marca' => $data['marca'],
            'origen' => $data['origen'],
        ]);

        echo json_encode(['status'=> 'ok']);
    break;
    case 'DELETE':
        // Recogemos toda la información recibida
        $inputJSON = file_get_contents('php://input');

        // Convertimos la información cruda en un diccionario
        $data = json_decode($inputJSON, true);

        $miConsulta = $miPDO->prepare('DELETE FROM relojes WHERE id = :id');
        // Ejecuta la sentencia SQL
        $miConsulta->execute([
            'id' => $data['id']
        ]);
        echo json_encode(['status'=> 'delete']);
    break;
    case 'GET':
        $miConsulta = $miPDO->prepare('SELECT * FROM travels;');
        // Ejecuta consulta
        $miConsulta->execute();

        $travels = $miConsulta->fetchAll();

        // Convirte a JSON y lo imprime
        echo json_encode($travels);
    break;
}




