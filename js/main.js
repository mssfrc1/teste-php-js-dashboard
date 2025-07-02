/**
 * Função responsável por interagir com o dashboard, exibindo a contagem das entidades e a troca de informações
 * baseada no card que foi selecionado
 */

$(document).ready(function () {

    const countMap = {
        clientes: '#card-dashboard-clientes',
        usuarios: '#card-dashboard-usuarios',
        fornecedores: '#card-dashboard-fornecedores'
    };

    const DashboardServiceMap = {
        clientes: DashboardService.getClientes,
        usuarios: DashboardService.getUsuarios,
        fornecedores: DashboardService.getFornecedores
    };

    Object.entries(countMap).forEach(([entity, selector]) => {
        const service = DashboardServiceMap[entity];
        if (!service) return;

        service('c').then(count => {
            $(`${selector}`).siblings('.number').text(count);
        });
    });

    $('.dashboard-stat .more').on('click', function (e) {
        e.preventDefault();

        const descId = $(this).closest('.dashboard-stat').find('.desc').attr('id'); // ex: card-dashboard-clientes
        const entity = descId.replace('card-dashboard-', ''); // clientes, usuarios, fornecedores
        const service = DashboardServiceMap[entity];

        if (!service) return;

        // cor = última classe do ID do card
        const color = $(`#${descId}`).closest('.dashboard-stat').attr('class').split(' ').pop();

        $('.portlet.box').removeClass('grey blue green purple').addClass(color);

        service().then(data => {
            const tbody = $('table.table-hover tbody');
            tbody.empty();

            data.forEach((item, i) => {
                const col3 = item.usuario || item.endereco || item.cidade || '-';
                tbody.append(`
                    <tr>
                        <td>${i + 1}</td>
                        <td>${item.nome || '-'}</td>
                        <td>${item.cpf || '-'}</td>
                        <td>${col3}</td>
                        <td><span class="label label-sm label-success">Ativo</span></td>
                    </tr>
                `);
            });
        });
    });
});
