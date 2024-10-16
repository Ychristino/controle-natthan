import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductFormData from '../../content/pageData/productFormData';
import { formatarValor, removerFormatacaoValor } from '../../content/utils/formats';

const CadastroProduto = () => {
  const [produtoData, setProdutoData] = useState({
    nome: '',
    valorCompra: '',
    lucro: '', // Lucro em percentual
    valorVenda: '', // Valor de venda calculado
    descricao: '',
    quantidade: 0,
  });
  const [pageData, setPageData] = useState(ProductFormData["pt-br"]);

  const calcularValorVenda = (valorCompra, lucro) => {
    const valorCompraNum = removerFormatacaoValor(valorCompra);
    const percentualLucro = parseFloat(lucro.replace(',', '.')) || 0;
    
    // Calcular valor de venda
    const valorVenda = valorCompraNum + (valorCompraNum * (percentualLucro / 100));
    return formatarValor(valorVenda.toFixed(2), pageData.countryFormatValue, pageData.currencyValue); // Retorna o valor de venda formatado
  };

  useEffect(() => {
    if (produtoData.valorCompra && produtoData.lucro) {
      const valorVendaCalculado = calcularValorVenda(produtoData.valorCompra, produtoData.lucro);
      setProdutoData((prevData) => ({
        ...prevData,
        valorVenda: valorVendaCalculado,
      }));
    }
  }, [produtoData.valorCompra, produtoData.lucro]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'valorCompra' || name === 'valorVenda') {
      setProdutoData((prevData) => ({
        ...prevData,
        [name]: formatarValor(value, pageData.countryFormatValue, pageData.currencyValue), // Aplica a máscara de moeda para valorCompra
      }));
    } else {
      setProdutoData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converter os valores de volta para decimal antes de enviar os dados
    const dadosProduto = {
      ...produtoData,
      valorCompra: removerFormatacaoValor(produtoData.valorCompra),
      lucro: parseFloat(produtoData.lucro.replace(',', '.')), // Armazenar como decimal
      valorVenda: removerFormatacaoValor(produtoData.valorVenda),
    };

    // Aqui você pode enviar os dados para o backend ou realizar outra ação
    console.log(dadosProduto);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{pageData.registerTitle}</h2>
        <form onSubmit={handleSubmit}>
          {/* Nome do Produto */}
          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label">{pageData.labelName}</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={produtoData.nome}
                onChange={handleChange}
                placeholder={pageData.inputnamePlaceholder}
                required
              />
            </div>
          </div>

          {/* Valores em linha: Valor de Compra, Lucro (%) e Valor de Venda */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">{pageData.labelValueCompra}</label>
              <input
                type="text"
                name="valorCompra"
                className="form-control"
                value={produtoData.valorCompra}
                onChange={handleChange}
                placeholder={pageData.inputValueCompraPlaceholder}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{pageData.labelLucro} (%)</label>
              <input
                type="text"
                name="lucro"
                className="form-control"
                value={produtoData.lucro}
                onChange={handleChange}
                placeholder={pageData.inputLucroPlaceholder} // Ex: "Ex: 20 para 20%"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{pageData.labelValueVenda}</label>
              <input
                type="text"
                name="valorVenda"
                className="form-control"
                value={produtoData.valorVenda}
                readOnly // O valor de venda é calculado e não deve ser editável
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label">{pageData.labelDescription}</label>
              <textarea
                name="descricao"
                className="form-control"
                value={produtoData.descricao}
                onChange={handleChange}
                placeholder={pageData.inputDescriptionPlaceholder}
                rows="3"
                required
              />
            </div>
          </div>

          {/* Quantidade */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">{pageData.labelAmount}</label>
              <input
                type="number"
                name="quantidade"
                className="form-control"
                value={produtoData.quantidade}
                onChange={handleChange}
                placeholder={pageData.inputAmountPlaceholder}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">{pageData.btmRegister}</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;
