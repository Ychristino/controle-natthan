import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaCity, FaFlag, FaHome, FaBuilding, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ClientRowData from "../../content/pageData/clientRowData";

const ClientRow = (props) => {
  const [expandedClient, setExpandedClient] = useState(null);
  const [pageData, setPageData] = useState(ClientRowData['pt-br']);
  
  const toggleExpand = (clienteId) => {
    if (expandedClient === clienteId) {
      setExpandedClient(null); // Se já está expandido, recolher
    } else {
      setExpandedClient(clienteId); // Expandir o cliente clicado
    }
  };

  return (
    <div className="card mb-3" key={props.id}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5><FaUser className="me-2" />{props.nome}</h5>
          <p className="mb-1"><FaPhone className="me-2" />{props.telefone}</p>
          <p className="mb-1"><FaEnvelope className="me-2" />{props.email}</p>
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
            aria-expanded={expandedClient === props.id}
            aria-controls={`collapse${props.id}`}
            onClick={() => toggleExpand(props.id)}
            title={expandedClient === props.id ? pageData.minimizeRegister : pageData.expandRegister}
          >
            {expandedClient === props.id ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>
      </div>
      <div id={`collapse${props.id}`} className={`collapse ${expandedClient === props.id ? 'show' : ''}`}>
        <div className="card-body">
          <p><FaIdCard className="me-2" /><strong>{pageData.labelIdNumber}:</strong> {props.cpf}</p>
          <p><FaCalendarAlt className="me-2" /><strong>{pageData.labelBirthDate}:</strong> {props.dataNascimento}</p>
          <p><FaFlag className="me-2" /><strong>{pageData.labelCountry}:</strong> {props.pais}</p>
          <p><FaFlag className="me-2" /><strong>{pageData.labelState}:</strong> {props.estado}</p>
          <p><FaCity className="me-2" /><strong>{pageData.labelCity}:</strong> {props.cidade}</p>
          <p><FaMapMarkerAlt className="me-2" /><strong>{pageData.labelZipCode}:</strong> {props.cep}</p>
          <p><FaMapMarkerAlt className="me-2" /><strong>{pageData.labelAdress}:</strong> {props.logradouro}</p>
          <p><FaHome className="me-2" /><strong>{pageData.labelResNumber}:</strong> {props.numero}</p>
          <p><FaBuilding className="me-2" /><strong>{pageData.labelAdressCompl}:</strong> {props.complementoEndereco !== null ? props.complementoEndereco : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientRow;
