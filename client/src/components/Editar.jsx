/**
 * @fileoverview Componente visual que muestra la pantalla de edición de los datos personales de un usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';

export const Editar = (props) => {
  return (
    <div className="inner-container">
      <div className="header">
        Editar mis datos
      </div>
      <div className="box">
        <div className="input-group">
          <p><strong>Nombre: </strong>{props.nombre}</p>
          <span>
            <input type="text" name="nombre" className="login-input"
              placeholder="Escribir nuevo nombre" onChange={props.onNombreChange} />
            <button type="button" className="login-btn button-next-input" onClick={props.cambiarNombre}>Cambiar</button>
          </span>
        </div>
        <div className="input-group">
          <p><strong>Primer apellido: </strong>{props.apellido1}</p>
          <span>
            <input type="text" name="apellido1" className="login-input"
              placeholder="Escribir nuevo apellido 1º" onChange={props.onAp1Change} />
            <button type="button" className="login-btn button-next-input" onClick={props.cambiarApellido1}>Cambiar</button>
          </span>
        </div>
        <div className="input-group">
          <p><strong>Segundo apellido: </strong>{props.apellido2}</p>
          <span>
            <input type="text" name="apellido2" className="login-input"
              placeholder="Escribir nuevo apellido 2º" onChange={props.onAp2Change} />
            <button type="button" className="login-btn button-next-input" onClick={props.cambiarApellido2}>Cambiar</button>
          </span>
        </div>
        <div className="input-group">
          <p><strong>DNI: </strong>{props.dni}</p>
          <span>
            <input type="text" name="dni" className="login-input"
              placeholder="Escribir nuevo DNI" onChange={props.onDNIChange} />
            <button type="button" className="login-btn button-next-input" onClick={props.cambiarDNI}>Cambiar</button>
          </span>
          <small className="danger-error">{props.errorDNI}</small>
        </div>
      </div>
    </div>
  );
}