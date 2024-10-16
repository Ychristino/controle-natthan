// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../content/auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/in">Sem Nome</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Exibir itens apenas se o usuário estiver autenticado */}
            {isAuthenticated && (
              <>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pessoa
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/cadastro-pessoa">Cadastro</Link></li>
                    <li><Link className="dropdown-item" to="/listagem-clientes">Lista</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Produto
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/cadastro-produto">Cadastro</Link></li>
                    <li><Link className="dropdown-item" to="/listagem-produtos">Lista</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pedidos
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/cadastro-venda">Cadastro</Link></li>
                    <li><Link className="dropdown-item" to="/listagem-pedidos">Lista</Link></li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          {/* Botão de Logout */}
          {isAuthenticated && (
            <button className="btn btn-outline-danger ms-auto" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
