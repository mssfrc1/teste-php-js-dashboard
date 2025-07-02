# Desafio Técnico – Dashboard PHP + jQuery

O projeto foi criado e hospedado localmente através do XAMPP, utilizando PHP 7.1.

## 1. Estrutura Comum (Cabeçalho, Menu, Rodapé)

O projeto adota uma estrutura de componentes reutilizáveis para páginas que compartilham layout base. Os arquivos `cabecalho.php`, `menu.php` e `rodape.php` foram criados e estão localizados no diretório:


/includes/
`cabecalho.php`
`menu.php`
`rodape.php`


Esses arquivos são incluídos diretamente no `index.php`, que funciona como página principal. O diretório `includes/` é responsável por tratar arquivos PHP estáticos utilizados no front.

---

## 2. Menu Lateral Dinâmico

A construção do menu lateral foi refatorada para ser dinâmica. As opções estão definidas em um array PHP localizado em:

/resources/data/menu/`mainMenuData.php`


Este arquivo define:
- Seções do menu
- Ícones (font-awesome)
- Sub-itens com seus respectivos títulos e URLs

Além dos itens estáticos, foram adicionados os seguintes:
- Cadastro > Produtos
- Cadastro > Perfil de acesso
- Relatório > Produtos

Todos os itens são ordenados alfabeticamente por seção e subitem, permitindo organização e escalabilidade.

---

## 3. Cards do dashboard

As três caixas da página inicial (Clientes, Usuários, Fornecedores) consultam seus respectivos valores de forma dinâmica via PHP, utilizando a classe `DataRequest` localizada na raíz do projeto.

Ao carregar a página, o número de registros é obtido para cada entidade por meio das funções:
- `dadosClientes('c')`
- `dadosUsuarios('c')`
- `dadosFornecedores('c')`

---

## 4. Interação Dinâmica com Cores (JS)

Utilizando apenas JavaScript (jQuery), a cor da "Tabela Simples" é atualizada conforme a caixa clicada:
- Clientes → azul
- Usuários → verde
- Fornecedores → roxo

A lógica de identificação é baseada no ID de cada `.desc`, exemplo: `#card-dashboard-clientes`. A cor é aplicada dinamicamente no container da tabela (`.portlet.box`), substituindo qualquer cor anterior.

---

## 5. Requisições AJAX e Atualização da Tabela

A classe `DataRequest` possui três funções que retornam arrays de dados:
- `dadosClientes()`
- `dadosUsuarios()`
- `dadosFornecedores()`

Essas funções são expostas por meio da API em:

api/`getData.php`

Essa camada de API centraliza a comunicação entre o frontend e o repositório de dados (`data_request.class.php`).

---

## JavaScript

### `js/services/DashboardService.js`
Responsável por encapsular a lógica de chamadas AJAX à API. Possui funções nomeadas que retornam Promises com os dados requisitados.

```js
DashboardService.getClientes()
DashboardService.getUsuarios()
DashboardService.getFornecedores()
```

Internamente utiliza:

```js
$.getJSON('/api/getData.php?action=...&type=...')
```
js/`main.js`
Arquivo de controle da interface. Gerencia:

- A captura dos cliques em "Visualizar"

- A troca de cor da tabela

- A renderização dinâmica dos dados na tabela

- A atualização dos contadores das caixas

- Se comunica com o DashboardService e manipula diretamente o DOM.

## Considerações finais

- Tempo de execução: ~2 horas

- Arquitetura pensada para separação de responsabilidades:

- HTML estático reutilizável (includes/)

- Dados estruturados (resources/data/)

- Backend isolado (data_request.class.php, api/)

- Camada de serviço JS (services/)

- Controle de interface no JS (main.js)

- A estrutura permite fácil expansão para novos dados e novas regras de negócio sem alteração da base existente.