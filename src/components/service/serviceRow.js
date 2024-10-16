import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaUser, FaCalendar, FaDollarSign, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaHammer } from 'react-icons/fa';
import ServiceRowData from "../../content/pageData/serviceRowData";

const ServiceRow = (props) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [pageData, setPageData] = useState(ServiceRowData['pt-br']);

  // Função para formatar o valor monetário
  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const toggleExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null); // Se já está expandido, recolher
    } else {
      setExpandedOrder(orderId); // Expandir o pedido clicado
    }
  };

  return (
    <div className="card mb-3" key={props.id}>
        <div className="card-header d-flex justify-content-between align-items-center">
            <div>
            <h5><FaUser className="me-2" />{props.clienteNome}</h5>
            <p className="mb-1"><FaCalendar className="me-2" />{new Date(props.dataPedido).toLocaleDateString('pt-BR')}</p>
            <p className="mb-1"><FaCalendar className="me-2" />{new Date(props.dataPagamento).toLocaleDateString('pt-BR')}</p>
            <p className="mb-1"><FaDollarSign className="me-2" />{formatarValor(props.valorTotal)}</p>
            </div>
            <div className="d-flex align-items-center">
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
                aria-expanded={expandedOrder === props.id}
                aria-controls={`collapse${props.id}`}
                onClick={() => toggleExpand(props.id)}
                title={expandedOrder === props.id ? pageData.minimizeRegister : pageData.expandRegister}
            >
                {expandedOrder === props.id ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
            </button>
            </div>
        </div>
        <div id={`collapse${props.id}`} className={`collapse ${expandedOrder === props.id ? 'show' : ''}`}>
            <div className="card-body">
                <p className="mb-1"><FaHammer className="me-2" />{formatarValor(props.valorServico)}</p>
                <p><strong>{pageData.labelOrderItems}:</strong></p>
                <ul>
                    {props.itens.map((item) => (
                    <li key={item.id}>
                        {item.nome} - {item.quantidade} x {formatarValor(item.preco)}
                    </li>
                    ))}                
                </ul>
            </div>
        </div>
    </div>
  );
};

export default ServiceRow;
