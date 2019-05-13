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
          <input type="text" name="nombre" className="login-input"
            placeholder="Introducir nuevo nombre" onChange={props.onNombreChange} />
          <button type="button" className="login-btn" onClick={props.cambiarNombre}>Cambiar</button>
        </div>
        <div className="input-group">
          <p><strong>Primer apellido: </strong>{props.apellido1}</p>
          <input type="text" name="apellido1" className="login-input"
            placeholder="Introducir nuevo primer apellido" onChange={props.onAp1Change} />
          <button type="button" className="login-btn" onClick={props.cambiarApellido1}>Cambiar</button>
        </div>
        <div className="input-group">
          <p><strong>Segundo apellido: </strong>{props.apellido2}</p>
          <input type="text" name="apellido2" className="login-input"
            placeholder="Introducir nuevo segundo apellido" onChange={props.onAp2Change} />
          <button type="button" className="login-btn" onClick={props.cambiarApellido2}>Cambiar</button>
        </div>
        <div className="input-group">
          <p><strong>DNI: </strong>{props.dni}</p>
          <input type="text" name="dni" className="login-input"
            placeholder="Introducir nuevo DNI" onChange={props.onDNIChange} />
          <small className="danger-error">{props.errorDNI}</small>
          <button type="button" className="login-btn" onClick={props.cambiarDNI}>Cambiar</button>
        </div>
      </div>
    </div>
  );
}