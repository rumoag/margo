<?php
require_once('connect.php');
// Cabecera que indica el tipo de contenido a servir
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'PUT':
        // Recogemos toda la información recibida
        $inputJSON = file_get_contents('php://input');

        // Convertimos la información cruda en un diccionario
        $data = json_decode($inputJSON, true);

        $miUpdate = $miPDO->prepare('UPDATE travelplan SET nameTravel= :nameTravel, image= :image, location= :location, longitud= :longitud, latitud= :latitud, date_initial= :date_initial, date_end= :date_end, money= :money, status = :status, deleted= :deleted WHERE id_travel = :id_travel');
        // Ejecuta el nuevo registro en la base de datos
        $miUpdate->execute([
            'id_travel' => $data['id_travel'],
            'nameTravel'=> $data['nameTravel'],
            'image' => $data['image'],
            'location' => $data['location'],
            'longitud' => $data['longitud'],
            'latitud' => $data['latitud'],
            'date_initial' => $data['date_initial'],
            'date_end' => $data['date_end'],
            'money' => $data['money'],
            'status' => $data['status'],
            'deleted'=> $data['deleted'],
        ]);

        echo json_encode(['status'=> 'ok']);
    break;
    case 'GET':
        $miConsultaPlan = $miPDO->prepare('SELECT * FROM travelplan WHERE deleted = 0 ;');
        // Ejecuta consulta
        $miConsultaPlan->execute();

        $travelPlan = $miConsultaPlan->fetchAll();

        // Convirte a JSON y lo imprime
        echo json_encode($travelPlan);
    break;
}




