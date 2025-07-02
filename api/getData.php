
<?php
require_once '../DataRequest.php';

/**
 * Função que cria a ponte entre o repositório (dados) e a chamada via front
 */

$action = isset($_GET['action']) ? $_GET['action'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';

$repository = new DataRequest();

switch ($action) {
    case 'clientes':
        echo json_encode($repository->dadosClientes($type));
        break;
    case 'fornecedores':
        echo json_encode($repository->dadosFornecedores($type));
        break;
    case 'usuarios':
        echo json_encode($repository->dadosUsuarios($type));
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Entidade não encontrada']);
}
