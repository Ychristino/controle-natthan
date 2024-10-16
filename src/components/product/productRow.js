import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaTag, FaBox, FaDollarSign, FaLayerGroup, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaPercent, FaPlus } from 'react-icons/fa';
import ProductRowData from "../../content/pageData/productRowData";
import ModalAddProduct from './modalAddProduct'; // Importando o novo modal

const ProductRow = (props) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [pageData, setPageData] = useState(ProductRowData['pt-br']);
  const [showModal, setShowModal] = useState(false); // Estado para controle do modal

  // Função para formatar o valor monetário
  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formataPercent = (valor) => {
    return `${parseFloat(valor).toFixed(2).replace('.', ',')}%`;
  };

  const toggleExpand = (produtoId) => {
    if (expandedProduct === produtoId) {
      setExpandedProduct(null); // Se já está expandido, recolher
    } else {
      setExpandedProduct(produtoId); // Expandir o produto clicado
    }
  };

  const handleAddProduct = () => {
    setShowModal(true); // Abre o modal ao clicar no ícone de adicionar
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fecha o modal
  };

  const handleAdd = (quantidade) => {
    // Aqui você pode adicionar a lógica para adicionar o produto ao estoque
    console.log(`Adicionar ${quantidade} itens ao estoque.`);
    // Adicione aqui a lógica necessária para manipular a quantidade no estado ou no backend
  };

  return (
    <div className="card mb-3" key={props.id}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5><FaTag className="me-2" />{props.codigo}</h5>
          <p className="mb-1"><FaBox className="me-2" />{props.nome}</p>
          <p className="mb-1"><FaDollarSign className="me-2" />{pageData.labelBuyValue}: {formatarValor(props.valorCompra)}</p>
          <p className="mb-1"><FaDollarSign className="me-2" />{pageData.labelSellValue}: {formatarValor(props.valorVenda)}</p>
          <p className="mb-1"><FaPercent className="me-2" />{pageData.labelProfitValue}: {formataPercent(props.lucro)}</p>
          <p className="mb-1"><FaLayerGroup className="me-2" />{pageData.labelAmountValue}: {props.quantidade}</p>
        </div>
        <div className="d-flex align-items-center">
          {/* Ícone para adicionar produto */}
          <button
            className="btn"
            title={pageData.addProduct}
            onClick={handleAddProduct}
          >
            <FaPlus size={20} />
          </button>
          {/* Ícone de Atualizar */}
          <button
            className="btn"
            title={pageData.updateRegister}
            onClick={() => props.onEdit(props.id)}
          >
            <FaEdit size={20} />
          </button>
          {/* Ícone de Deletar */}
          <button
            className="btn"
            title={pageData.deleteRegister}
            onClick={() => props.onDelete(props.id)}
          >
            <FaTrash size={20} />
          </button>
          {/* Ícone para expandir ou recolher detalhes */}
          <button
            className="btn"
            type="button"
            aria-expanded={expandedProduct === props.id}
            aria-controls={`collapse${props.id}`}
            onClick={() => toggleExpand(props.id)}
            title={expandedProduct === props.id ? pageData.minimizeRegister : pageData.expandRegister}
          >
            {expandedProduct === props.id ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>
      </div>
      <div id={`collapse${props.id}`} className={`collapse ${expandedProduct === props.id ? 'show' : ''}`}>
        <div className="card-body">
          <p><strong>{pageData.labelProductDescription}:</strong> {props.descricao}</p>
        </div>
      </div>

      {/* Modal para adicionar produtos */}
      <ModalAddProduct 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleAdd={handleAdd}
        productId={props.codigo}
      />
    </div>
  );
};

export default ProductRow;
