import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderRow from './orderRow'; // Importe o componente OrderRow que você criou
import OrderListData from '../../content/pageData/orderListData'; // Dados de legendas e textos

// Dados mockados de pedidos
const ordersMock = [
  {
    id: 1,
    clienteNome: 'João Silva',
    dataPedido: '2024-10-01T10:00:00Z',
    dataPagamento: '2024-10-02T10:00:00Z',
    valorTotal: 150.0,
    itens: [
      { id: 1, nome: 'Produto A', quantidade: 2, preco: 50.0 },
      { id: 2, nome: 'Produto B', quantidade: 1, preco: 50.75 },
    ],
  },
  {
    id: 2,
    clienteNome: 'Maria Oliveira',
    dataPedido: '2024-10-05T11:00:00Z',
    dataPagamento: '2024-10-06T11:00:00Z',
    valorTotal: 300.0,
    itens: [
      { id: 3, nome: 'Produto C', quantidade: 1, preco: 200.0 },
      { id: 4, nome: 'Produto D', quantidade: 2, preco: 50.0 },
    ],
  },
  // Adicione mais pedidos conforme necessário
];

const ListagemPedidos = () => {
  const [orders, setOrders] = useState(ordersMock); // Lista de pedidos inicial
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
  const [startDate, setStartDate] = useState(''); // Data de início do filtro
  const [endDate, setEndDate] = useState(''); // Data de fim do filtro
  const [dateType, setDateType] = useState('pedido'); // Tipo de data para busca
  const [pageData, setPageData] = useState(OrderListData['pt-br']);
  const ordersPerPage = 10; // Número de pedidos por página

  // Função para filtrar os pedidos com base no termo de busca e intervalo de datas
  const filteredOrders = orders.filter((order) => {
    const clienteMatch = order.clienteNome.toLowerCase().includes(searchTerm.toLowerCase());
    const datePedido = new Date(order.dataPedido);
    const datePagamento = new Date(order.dataPagamento);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const isInDateRangePedido = !start && !end || (start && end ? datePedido >= start && datePedido <= end : start && datePedido >= start || end && datePedido <= end);
    const isInDateRangePagamento = !start && !end || (start && end ? datePagamento >= start && datePagamento <= end : start && datePagamento >= start || end && datePagamento <= end);

    // Filtra com base no tipo de data selecionado
    return (
      clienteMatch &&
      ((dateType === 'pedido' && isInDateRangePedido) ||
       (dateType === 'pagamento' && isInDateRangePagamento))
    );
  });

  // Ordena os pedidos filtrados por data do pedido, do mais novo para o mais velho
  const sortedOrders = filteredOrders.sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido));

  // Calcula o número total de páginas
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Determina os pedidos da página atual
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Função para alterar a página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Função para lidar com a mudança do termo de busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova busca
  };

  // Função para lidar com a mudança da data de início
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova busca
  };

  // Função para lidar com a mudança da data de fim
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova busca
  };

  // Função para lidar com a seleção do tipo de data
  const handleDateTypeChange = (e) => {
    setDateType(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova busca
  };

  // Função para limpar os filtros de data
  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1); // Resetar para a primeira página após limpar os filtros
  };

  const handleEdit = (id) => {
    console.log("Editar pedido com ID:", id);
    // Aqui você pode abrir um modal de edição ou preencher o formulário com os dados do pedido
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id)); // Remove o pedido da lista
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{pageData.pageTitle}</h2>

      {/* Campo de busca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder={pageData.searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Seleção do tipo de data */}
      <div className="mb-4">
        <label className="form-label">Buscar por:</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="dateType"
              id="pedido"
              value="pedido"
              checked={dateType === 'pedido'}
              onChange={handleDateTypeChange}
            />
            <label className="form-check-label" htmlFor="pedido">Data do Pedido</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="dateType"
              id="pagamento"
              value="pagamento"
              checked={dateType === 'pagamento'}
              onChange={handleDateTypeChange}
            />
            <label className="form-check-label" htmlFor="pagamento">Data de Pagamento</label>
          </div>
        </div>
      </div>

      {/* Filtros de data */}
      <div className="mb-4 d-flex justify-content-between">
        <div className="me-2">
          <label htmlFor="startDate" className="form-label">Data de Início:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="me-2">
          <label htmlFor="endDate" className="form-label">Data de Fim:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        {/* Botão para limpar filtros */}
        <div className="align-self-end">
          <button className="btn btn-secondary" onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Renderizando a lista de pedidos */}
      {currentOrders.map((order) => (
        <OrderRow
          key={order.id}
          id={order.id}
          clienteNome={order.clienteNome}
          dataPedido={order.dataPedido}
          dataPagamento={order.dataPagamento}
          valorTotal={order.valorTotal}
          itens={order.itens} // Passando a lista de itens
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {/* Paginação */}
      <nav aria-label="Paginação de pedidos">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <a className="page-link" href="#!">
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListagemPedidos;
