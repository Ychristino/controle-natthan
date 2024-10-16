// modalAddProduct.js
import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import ModalProductsData from "../../content/pageData/modalAddProductsData";

const ModalAddProduct = ({ show, handleClose, handleAdd, productId }) => {
  const [quantidade, setQuantidade] = useState(1); // Estado para armazenar a quantidade informada
  const [pageData, setPageData] = useState(ModalProductsData['pt-br']);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(quantidade); // Chama a função para adicionar a quantidade
    handleClose(); // Fecha o modal após enviar
    setQuantidade(1); // Reseta a quantidade
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pageData.modalTitle} - {productId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="quantidade" className="form-label">{pageData.labelAmount}</label>
            <input
              type="number"
              className="form-control"
              id="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
              min="1"
            />
          </div>
          <Button variant="primary" type="submit">
            {pageData.btmAdd}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProduct;
