// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './content/auth/AuthContext';
import Navbar from './components/navbar/navbar';
import Login from './components/login/loginPage';
import CadastroPessoa from './components/client/clientForm';
import ListagemClientes from './components/client/clientList';
import CadastroProduto from './components/product/productForm';
import ListagemProdutos from './components/product/productList';
import CadastroVenda from './components/order/orderForm';
import ListagemPedidos from './components/order/orderList';
import ProtectedRoute from './content/auth/ProtectedRoute';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoggedPage from './components/login/loggedPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/cadastro-pessoa" element={
            <ProtectedRoute>
              <CadastroPessoa />
            </ProtectedRoute>
          } />
          <Route path="/listagem-clientes" element={
            <ProtectedRoute>
              <ListagemClientes />
            </ProtectedRoute>
          } />
          <Route path="/cadastro-produto" element={
            <ProtectedRoute>
              <CadastroProduto />
            </ProtectedRoute>
          } />
          <Route path="/listagem-produtos" element={
            <ProtectedRoute>
              <ListagemProdutos />
            </ProtectedRoute>
          } />
          <Route path="/cadastro-venda" element={
            <ProtectedRoute>
              <CadastroVenda />
            </ProtectedRoute>
          } />
          <Route path="/listagem-pedidos" element={
            <ProtectedRoute>
              <ListagemPedidos />
            </ProtectedRoute>
          } />
          <Route path="/in" element={
            <ProtectedRoute>
              <LoggedPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
