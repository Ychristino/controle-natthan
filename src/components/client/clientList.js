import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientRow from './clientRow';
import ClientListData from '../../content/pageData/clientListData';

// Dados mockados de clientes
const clientsMock = [
  {
    id: 1,
    nome: 'Yan Silva',
    telefone: '(11) 99999-9999',
    email: 'yan@example.com',
    cpf: '123.456.789-00',
    dataNascimento: '1990-01-01',
    logradouro: 'Rua Exemplo, 123',
    cep: '01234-567',
    cidade: 'São Paulo',
    estado: 'SP',
    pais: 'Brasil',
    numero: 90,
    complementoEndereco: 'casa 980',
  },
  {
    id: 2,
    nome: 'Joana Santos',
    telefone: '(21) 98765-4321',
    email: 'joana@example.com',
    cpf: '987.654.321-00',
    dataNascimento: '1985-05-15',
    logradouro: 'Av. das Américas, 456',
    cep: '22345-678',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    pais: 'Brasil',
    numero: 55,
    complementoEndereco: null,
  },
];

const ListagemClientes = () => {
  const [clients, setClients] = useState(clientsMock); // Lista de clientes inicial
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
  const [pageData, setPageData] = useState(ClientListData['pt-br']);
  const clientsPerPage = 10; // Número de clientes por página

  // Função para filtrar os clientes com base no termo de busca
  const filteredClients = clients.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcula o número total de páginas
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  // Determina os clientes da página atual
  const currentClients = filteredClients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
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

  const handleEdit = (id) => {
    console.log("Editar cliente com ID:", id);
    // Aqui você pode abrir um modal de edição ou preencher o formulário com os dados do cliente
  };

  const handleDelete = (id) => {
    setClients(clientsMock.filter(client => client.id !== id)); // Remove o cliente da lista
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

      {/* Renderizando a lista de clientes */}
      {currentClients.map((client) => (
        <ClientRow
          key={client.id}
          id={client.id}
          nome={client.nome}
          telefone={client.telefone}
          email={client.email}
          cpf={client.cpf}
          dataNascimento={client.dataNascimento}
          logradouro={client.logradouro}
          cep={client.cep}
          cidade={client.cidade}
          estado={client.estado}
          pais={client.pais}
          numero={client.numero}
          complementoEndereco={client.complementoEndereco}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {/* Paginação */}
      <nav aria-label="Paginação de clientes">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListagemClientes;
