import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

// Importar iconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', { user: email, password });
      if (response.status === 200) {
        const { token, authorities } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ user: email, roles: authorities[0] }));

        if (authorities.includes('ADMIN')) {
          window.location.href = '/GestionarReserva';
        } else if (authorities.includes('USER')) {
          window.location.href = '/Index';
        } else {
          window.location.href = '/';
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Usuario y/o Contraseña Incorrectos');
    }

    if (rememberMe) {
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
    }
  };

  return (
    <div className='login'>
      <div className='Header-Login'>
        <h2 className="Logo">EasyPlanning</h2>
        <ul className="navegacion">
          <a href="/">Inicio</a>
          <a href="/informacion">Información</a>
          <a href="/contactanos">Contáctenos</a>
          <button className="btnInciarSesion" onClick={toggleForm}>Iniciar Sesión</button>
        </ul>
      </div>

      <div className={`fondo ${showLogin ? 'active-btn' : ''}`}>
        <span className="icono-cerrar" onClick={toggleForm}>
          <FontAwesomeIcon icon={faXmark} />
        </span>

        {showLogin ? (
          <div className="contenedor-form Login">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="contenedor-input">
                <span className="icono">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>

              <div className="contenedor-input">
                <span className="icono">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Contraseña</label>
              </div>

              <div className="recordar">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Recordar Sesión
                </label>
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="btnIniciar">Iniciar Sesión</button>

              <div className="registrar">
                <p>
                  ¿No tienes cuenta?{' '}
                  <a href="#" className="registrar-link" onClick={toggleForm}>
                    Regístrate
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="contenedor-form registrar">
            <h2>Registrarse</h2>
            <form>
              <div className="contenedor-input">
                <span className="icono">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input type="text" required />
                <label>Nombre</label>
              </div>

              <div className="contenedor-input">
                <span className="icono">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input type="email" required />
                <label>Email</label>
              </div>

              <div className="contenedor-input">
                <span className="icono">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input type="password" required />
                <label>Contraseña</label>
              </div>

              <div className="recordar">
                <label>
                  <input type="checkbox" /> Acepto los términos y condiciones
                </label>
              </div>

              <button type="submit" className="btn">Registrarme</button>

              <div className="registrar">
                <p>
                  ¿Tienes una cuenta?{' '}
                  <a href="#" className="Login-link" onClick={toggleForm}>
                    Iniciar Sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
