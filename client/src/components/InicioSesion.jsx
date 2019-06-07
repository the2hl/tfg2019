/**
 * @fileoverview Componente visual que muestra la pantalla para iniciar sesión en la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationData from '../lotties/password.json';

export const InicioSesion = (props) => {
  const defaultOptions = {
    loop: 1,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div>
      <div className="header">
        Iniciar Sesión
      </div>
      <div className="box">
        <form onSubmit={props.iniciarSesion} method="post">
          <div className="input-group">
            <label className="login-label" htmlFor="contraseña">Contraseña</label>
            <input type="password" name="contraseña" autoComplete="on" id="contraseña" aria-label="contraseña"
              className="login-input" placeholder="Debe tener 5 caracteres como mínimo" onChange={props.onPasswordChange} />
            <small className="danger-error">{props.passwordErr}</small>
            <button type="submit" className="login-btn">Iniciar Sesión</button>
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        </form>
      </div>
    </div>
  );
}