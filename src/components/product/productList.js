import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductRow from './productRow';
import ProductListData from '../../content/pageData/productListData';

// Dados mockados de produtos
const productsMock = [
  {
    id: 1,
    codigo: 'PRD001',
    nome: 'Produto A',
    valorCompra: 150.0, // Valor de compra
    valorVenda: 180.0, // Valor de venda (exemplo)
    lucro: 50,
    quantidade: 50,
    descricao: 'Descrição do Produto A',
  },
  {
    id: 2,
    codigo: 'PRD002',
    nome: 'Produto B',
    valorCompra: 300.0,
    valorVenda: 360.0,
    lucro: 30,
    quantidade: 30,
    descricao: 'Descrição do Produto B',
  },
  {
    id: 3,
    codigo: 'PRD003',
    nome: 'Produto C',
    valorCompra: 200.0,
    valorVenda: 240.0,
    lucro: 100,
    quantidade: 20,
    descricao: 'Descrição do Produto C',
  },
  // Adicione mais produtos conforme necessário
];

const ListagemProdutos = () => {
  const [products, setProducts] = useState(productsMock); // Lista de produtos inicial
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
  const [sortField, setSortField] = useState('nome'); // Campo de ordenação
  const [sortOrder, setSortOrder] = useState('asc'); // Ordem de ordenação
  const [pageData, setPageData] = useState(ProductListData['pt-br']);
  const productsPerPage = 10; // Número de produtos por página

  // Função para filtrar os produtos com base no termo de busca
  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.includes(searchTerm)
  );

  // Ordena os produtos filtrados com base no campo e na ordem selecionados
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortField === 'codigo') {
      return sortOrder === 'asc' ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo);
    }
    if (sortField === 'nome') {
      return sortOrder === 'asc' ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome);
    }
    if (sortField === 'valorCompra') {
      return sortOrder === 'asc' ? a.valorCompra - b.valorCompra : b.valorCompra - a.valorCompra;
    }
    if (sortField === 'valorVenda') {
      return sortOrder === 'asc' ? a.valorVenda - b.valorVenda : b.valorVenda - a.valorVenda;
    }
    if (sortField === 'quantidade') {
      return sortOrder === 'asc' ? a.quantidade - b.quantidade : b.quantidade - a.quantidade;
    }
    if (sortField === 'lucro') {
      return sortOrder === 'asc' ? a.lucro - b.lucro : b.lucro - a.lucro;
    }
    return 0; // Retorna 0 se não houver correspondência
  });

  // Calcula o número total de páginas
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Determina os produtos da página atual
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
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

  // Função para lidar com a mudança do campo de ordenação
  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova ordenação
  };

  // Função para lidar com a mudança da ordem de ordenação
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página após nova ordenação
  };

  const handleEdit = (id) => {
    console.log("Editar produto com ID:", id);
    // Aqui você pode abrir um modal de edição ou preencher o formulário com os dados do produto
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id)); // Remove o produto da lista
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

      {/* Filtros de ordenação */}
      <div className="mb-4 d-flex justify-content-between">
        <div className="me-2">
          <label htmlFor="sortField" className="form-label">Ordenar por:</label>
          <select id="sortField" className="form-select" value={sortField} onChange={handleSortFieldChange}>
            <option value="nome">Nome</option>
            <option value="codigo">Código</option>
            <option value="valorCompra">Custo do produto</option>
            <option value="valorVenda">Valor de venda</option>
            <option value="lucro">Lucro</option>
            <option value="quantidade">Quantidade</option>
          </select>
        </div>
        <div className="me-2">
          <label htmlFor="sortOrder" className="form-label">Ordem:</label>
          <select id="sortOrder" className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>
      </div>

      {/* Renderizando a lista de produtos */}
      {currentProducts.map((product) => (
        <ProductRow
          key={product.id}
          id={product.id}
          codigo={product.codigo}
          nome={product.nome}
          valorCompra={product.valorCompra} // Passando o valor de custo
          valorVenda={product.valorVenda} // Passando o valor de venda
          lucro={product.lucro} // Passando o valor de venda
          quantidade={product.quantidade}
          descricao={product.descricao}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {/* Paginação */}
      <nav aria-label="Paginação de produtos">
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

export default ListagemProdutos;
