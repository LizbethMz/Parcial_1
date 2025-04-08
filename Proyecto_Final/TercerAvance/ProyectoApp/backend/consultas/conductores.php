<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include_once '../config/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['check_numero'])) {
            checkNumeroConductorExistente($_GET['check_numero']);
        } else {
            getConductores();
        }
        break;
    case 'POST':
        createConductor();
        break;
    case 'PUT':
        updateConductor();
        break;
    case 'DELETE':
        deleteConductor();
        break;
    default:
        echo json_encode(["message" => "Método no permitido"]);
        break;
}

function getConductores() {
    try {
        $connection = Conexion::get_connection();
        $result = $connection->query("SELECT numero, nombre_pila, apellidoP, apellidoM FROM conductor ORDER BY numero ASC");
        $conductores = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($conductores);
        $connection->close();
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function checkNumeroConductorExistente($numero) {
    try {
        $connection = Conexion::get_connection();
        $query = $connection->prepare("SELECT COUNT(*) as count FROM conductor WHERE numero = ?");
        $query->bind_param("i", $numero);
        $query->execute();
        $result = $query->get_result();
        $row = $result->fetch_assoc();
        
        echo json_encode(["existe" => $row['count'] > 0]);
        $connection->close();
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function createConductor() {
    try {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->numero) || !isset($data->nombre_pila) || !isset($data->apellidoP) || !isset($data->apellidoM)) {
            throw new Exception("Todos los campos son requeridos");
        }

        $connection = Conexion::get_connection();

        // Verificar si el número ya existe
        $checkQuery = $connection->prepare("SELECT COUNT(*) as count FROM conductor WHERE numero = ?");
        $checkQuery->bind_param("i", $data->numero);
        $checkQuery->execute();
        $checkResult = $checkQuery->get_result();
        $checkRow = $checkResult->fetch_assoc();
        
        if ($checkRow['count'] > 0) {
            throw new Exception("El número de conductor ya está registrado");
        }

        $query = $connection->prepare("INSERT INTO conductor (numero, nombre_pila, apellidoP, apellidoM) VALUES (?, ?, ?, ?)");
        $query->bind_param("isss", $data->numero, $data->nombre_pila, $data->apellidoP, $data->apellidoM);
        
        if (!$query->execute()) {
            throw new Exception("Error al crear el conductor: " . $query->error);
        }

        echo json_encode([
            "success" => true,
            "message" => "Conductor creado exitosamente"
        ]);
        $connection->close();
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
}

function updateConductor() {
    try {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->numero) || !isset($data->nombre_pila) || !isset($data->apellidoP) || !isset($data->apellidoM)) {
            throw new Exception("Todos los campos son requeridos");
        }

        $connection = Conexion::get_connection();

        $query = $connection->prepare("UPDATE conductor SET nombre_pila = ?, apellidoP = ?, apellidoM = ? WHERE numero = ?");
        $query->bind_param("sssi", $data->nombre_pila, $data->apellidoP, $data->apellidoM, $data->numero);
        
        if (!$query->execute()) {
            throw new Exception("Error al actualizar el conductor: " . $query->error);
        }

        echo json_encode([
            "success" => true,
            "message" => "Conductor actualizado exitosamente"
        ]);
        $connection->close();
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
}

function deleteConductor() {
    try {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->numero)) {
            throw new Exception("El número del conductor es requerido");
        }

        $connection = Conexion::get_connection();

        $query = $connection->prepare("DELETE FROM conductor WHERE numero = ?");
        $query->bind_param("i", $data->numero);
        
        if (!$query->execute()) {
            throw new Exception("Error al eliminar el conductor: " . $query->error);
        }

        echo json_encode([
            "success" => true,
            "message" => "Conductor eliminado exitosamente"
        ]);
        $connection->close();
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
}
?>