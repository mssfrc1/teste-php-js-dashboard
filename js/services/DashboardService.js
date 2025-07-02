/**
 * DashboardService
 * Serviço responsável por consumir os dados da API para o dashboard.
 * Utiliza jQuery AJAX (getJSON) para comunicação com `getData.php`.
 *
 * API_BASE:
 *  Caminho base da API usada para requisições.
 *
 * fetch(action, type):
 *  Função genérica para consumir qualquer ação da API.
 *  @param {string} action - Nome da ação (ex: 'clientes')
 *  @param {string} type   - Tipo opcional ('' ou 'c' para contagem)
 *  @returns {Promise}
 *
 * getClientes(type):
 *  Retorna dados ou contagem de clientes.
 *
 * getFornecedores(type):
 *  Retorna dados ou contagem de fornecedores.
 *
 * getUsuarios(type):
 *  Retorna dados ou contagem de usuários.
 */

const API_BASE = './api/getData.php';

const DashboardService = {
    fetch: (action, type = '') =>
        $.getJSON(`${API_BASE}?action=${action}&type=${type}`),

    getClientes: (type = '') => DashboardService.fetch('clientes', type),
    getFornecedores: (type = '') => DashboardService.fetch('fornecedores', type),
    getUsuarios: (type = '') => DashboardService.fetch('usuarios', type)
};
