<?php

$menu = [
    'Dashboard' => [
        'icon' => 'fa fa-home',
        'items' => [],
    ],
    'Cadastro' => [
        'icon' => 'fa fa-file-text',
        'items' => [
            'Cliente' => '#',
            'Fornecedor' => '#',
            'Usuário' => '#',
            'Perfil de acesso' => '#',
            'Produtos' => '#',
        ],
    ],
    'Relatório' => [
        'icon' => 'fa fa-bar-chart-o',
        'items' => [
            'Cliente' => '#',
            'Faturamento' => '#',
            'Produtos' => '#',
        ],
    ],
];

foreach ($menu as &$section) {
    ksort($section['items']);
}
unset($section);

return $menu;
