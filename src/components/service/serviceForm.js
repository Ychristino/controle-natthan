import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import ServiceFormData from '../../content/pageData/serviceFormData';
import { formatarValor, removerFormatacaoValor } from '../../content/utils/formats';

// Mock de dados para pessoas cadastradas
const clientsMock = [
  { id: 1, nome: 'Yan Silva' },
  { id: 2, nome: 'Joana Santos' },
  { id: 3, nome: 'Carlos Oliveira' },
  { id: 4, nome: 'Maria Fernanda' },
  { id: 5, nome: 'Pedro Henrique' },
  { id: 6, nome: 'Ana Beatriz' },
];

// Mock de dados de produtos cadastrados
const productsMock = [
  { id: 1, nome: 'Produto A', valor: 150.0 },
  { id: 2, nome: 'Produto B', valor: 300.0 },
  { id: 3, nome: 'Produto C', valor: 200.0 },
  { id: 4, nome: 'Produto D', valor: 120.0 },
  { id: 5, nome: 'Produto E', valor: 450.0 },
];

const CadastroServico = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedClient, setSelectedClient] = useState(null); // Cliente selecionado
  const [searchClientTerm, setSearchClientTerm] = useState(''); // Termo de busca do cliente
  const [selectedProducts, setSelectedProducts] = useState([]); // Produtos adicionados à venda
  const [productToAdd, setProductToAdd] = useState(''); // Produto a ser adicionado
  const [quantity, setQuantity] = useState(1); // quantity do produto a ser adicionado
  const [searchProductTerm, setSearchProductTerm] = useState(''); // Termo de busca do produto
  const [orderDate, setOrderDate] = useState(today); // Data do pedido
  const [paymentDate, setPaymentDate] = useState(today); // Data do pagamento
  const [serviceValue, setServiceValue] = useState(''); // Data do pagamento
  const [pageData, setPageData] = useState(ServiceFormData['pt-br']);

  // Função para buscar e selecionar um cliente
  const handleClientSearch = (e) => {
    setSearchClientTerm(e.target.value);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setSearchClientTerm(''); // Limpar o campo de busca
  };

  const handleClientReset = () => {
    setSelectedClient(null); // Resetar o cliente selecionado
    setSearchClientTerm(''); // Limpar o campo de busca
  };

  // Função para adicionar produtos à lista de venda
  const handleAddProduct = () => {
    const product = productsMock.find((p) => p.nome === productToAdd);
    if (product && quantity > 0) {
      // Verifica se o produto já está na lista
      const existingProduct = selectedProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        // Se o produto já existe, apenas atualiza a quantity
        setSelectedProducts(
          selectedProducts.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
          )
        );
      } else {
        // Se o produto não existe, adiciona à lista
        setSelectedProducts([...selectedProducts, { ...product, quantity }]);
      }
      setProductToAdd(''); // Limpar o campo de produto
      setQuantity(1); // Resetar a quantity
    }
  };

  const handleProductSelect = (product) => {
    setProductToAdd(product.nome);
    setQuantity(1); // Resetar quantity ao selecionar um produto
    setSearchProductTerm(''); // Limpar o campo de busca
  };

  const handleProductCancel = () => {
    setProductToAdd(''); // Limpar a seleção do produto
    setQuantity(1); // Resetar a quantity
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };

  // Função para calcular o valor total da venda
  const calculateTotal = () => {
    let valTot = 0;
    if (selectedProducts != undefined)
        valTot = selectedProducts.reduce((total, product) => total + product.valor * product.quantity, 0);
    if (serviceValue.valorServico !== undefined)
        valTot += parseFloat(removerFormatacaoValor(serviceValue.valorServico));

    return valTot
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'valorServico') {
      setServiceValue((prevData) => ({
        ...prevData,
        [name]: formatarValor(value, pageData.countryFormatValue, pageData.currencyValue), // Aplica a máscara de moeda para valorCompra
      }));
    } else {
        setServiceValue((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{pageData.registerTitle}</h2>

        {/* Seção de busca e seleção de cliente */}
        <div className="mb-4">
          <h5>{pageData.labelSearchCliente}</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder={pageData.inputSearchClientePlaceholder}
            value={searchClientTerm}
            onChange={handleClientSearch}
          />
          {!selectedClient && (
            <ul className="list-group" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {clientsMock
                .filter((client) => client.nome.toLowerCase().includes(searchClientTerm.toLowerCase()))
                .slice(0, 5) // Limitar a 5 resultados
                .map((client) => (
                  <li
                    key={client.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleClientSelect(client)}
                    style={{ cursor: 'pointer' }}
                  >
                    {client.nome}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Cliente selecionado */}
        {selectedClient && (
          <div className="mb-4">
            <h5>{pageData.labelSelectedClient}: {selectedClient.nome}</h5>
            <button className="btn btn-secondary" onClick={handleClientReset}>
            {pageData.buttonChangeCliente}
            </button>
          </div>
        )}

        {/* Seção para selecionar datas */}
        <div className="mb-4">
            <div className="row">
                <div className="col">
                    <h5>{pageData.labelOrderDate}</h5>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                    />
                </div>
                <div className="col">
                    <h5>{pageData.labelPaymentDate}</h5>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="col-md-4">
            <h5>{pageData.labelServiceValue}</h5>
                <input
            type="text"
            name="valorServico"
            className="form-control"
            onChange={handleChange}
            value={serviceValue.valorServico}
            placeholder={pageData.inputServiceValuePlaceholder}
            required
            />
        </div>

        {/* Seção para adicionar produtos */}
        <div className="d-flex mt-4 mb-4">
          {/* Coluna da esquerda para seleção de produtos */}
          <div className="flex-fill me-3">
            <h5>{pageData.titleAddProducts}</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder={pageData.inputSearchProductPlaceholder}
              value={searchProductTerm}
              onChange={(e) => setSearchProductTerm(e.target.value)}
            />
            {!productToAdd ? ( // Mostra a lista de produtos apenas se nenhum produto estiver selecionado
              <ul className="list-group" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {productsMock
                  .filter((product) => product.nome.toLowerCase().includes(searchProductTerm.toLowerCase()))
                  .map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item"
                      onClick={() => handleProductSelect(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.nome} - R$ {product.valor.toFixed(2)}
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="mb-2">
                <h6>{pageData.labelSelectedProduct}: {productToAdd}</h6>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} // Garantir que a quantity seja um número válido
                />
                <button className="btn btn-primary" onClick={handleAddProduct}>
                {pageData.buttonAddProduct}
                </button>
                <button className="btn btn-secondary ms-2" onClick={handleProductCancel}>
                {pageData.buttonCancelProduct}
                </button>
              </div>
            )}
          </div>

          {/* Coluna da direita para produtos selecionados */}
          <div className="flex-fill">
            {selectedProducts.length > 0 && (
              <div className="mb-4">
                <h5>{pageData.labelListSelectedProducts}</h5>
                <ul className="list-group">
                  {selectedProducts.map((product) => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {product.nome} - {product.quantity} x R$ {product.valor.toFixed(2)}
                      <button
                        className="btn btn-sm"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <FaTrash className="me-2" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <h6 className="mt-2 d-flex justify-content-end">Total: {formatarValor(calculateTotal().toFixed(2))}</h6>

        {/* Botão de enviar */}
        <button className="btn btn-success mt-3">
        {pageData.buttonFinish}
        </button>
      </div>
    </div>
  );
};

export default CadastroServico;
