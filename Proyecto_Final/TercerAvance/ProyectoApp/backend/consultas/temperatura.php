<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include_once '../config/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getTemperaturas();
        break;
    default:
        echo json_encode(["message" => "Método no permitido"]);
        break;
}

function getTemperaturas() {
    try {
        $connection = Conexion::get_connection();
        $result = $connection->query("SELECT numero, temperatura, hora, fecha, num_envio FROM registro_temperatura ORDER BY fecha DESC, hora DESC");
        $temperaturas = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($temperaturas);
        $connection->close();
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}