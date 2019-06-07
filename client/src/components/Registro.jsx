/**
 * @fileoverview Componente visual que muestra la pantalla para registrar un testamento en la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationData from '../lotties/registro.json';

export const Registro = (props) => {
  const defaultOptions = {
    loop: 0,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <div className="header">
        Registro
      </div>
      <div className="box">
        <form onSubmit={props.registrar} method="post">
          <div className="input-group">
            <label className="login-label" htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" className="login-input" placeholder="Introduzca su nombre"
              onChange={props.onNombreChange} />
            <small className="danger-error">{props.nombreErr ? props.nombreErr : ""}</small>
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="apellido1">Primer apellido</label>
            <input type="text" name="apellido1" className="login-input"
              placeholder="Introduzca su primer apellido" onChange={props.onApellido1Change} />
            <small className="danger-error">{props.apellido1Err ? props.apellido1Err : ""}</small>
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="apellido2">Segundo apellido (opcional)</label>
            <input type="text" name="apellido2" className="login-input"
              placeholder="Introduzca su segundo apellido" onChange={props.onApellido2Change} />
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="dni">DNI</label>
            <input type="text" name="dni" className="login-input" placeholder="Debe tener 9 caracteres"
              onChange={props.onDNIChange} />
            <small className="danger-error">{props.dniErr ? props.dniErr : ""}</small>
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="password">Contraseña</label>
            <input type="password" name="password" autoComplete="on" className="login-input"
              placeholder="Debe tener 5 caracteres como mínimo" onChange={props.onPasswordChange} />
            {props.password &&
              <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (props.pwdWeak ? "show" : "")}></div>
                <div
                  className={"pwd pwd-medium " + (props.pwdMedium ? "show" : "")}></div>
                <div
                  className={"pwd pwd-strong " + (props.pwdStrong ? "show" : "")}></div>
              </div>}
            <small className="danger-error">{props.passwordErr ? props.passwordErr : ""}</small>
            <div className="lottie-and-button">
              <Lottie options={defaultOptions} height={150} width={150} />
              <button type="submit" className="login-btn">Registrarme</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}