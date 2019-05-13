/**
 * @fileoverview Componente visual que muestra los datos personales de un usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';

export const Datos = (props) => {
  return (
    <div>
      <div className="header">
        {props.cabecera}
      </div>
      <div className="box">
        <p><strong>Nombre: </strong>{props.nombre}</p>
        <p><strong>Primer apellido: </strong>{props.apellido1}</p>
        <p><strong>Segundo apellido: </strong>{props.apellido2}</p>
        <p><strong>DNI: </strong>{props.dni}</p>
      </div>
    </div>
  );
}