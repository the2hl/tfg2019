import React from 'react';

export const Datos = (props) => {
  return (
    <div className="inner-container">
      <div className="header">
        Datos personales
                        </div>
      <div className="box">
        <h3>Nombre</h3>
        <p>{props.nombre}</p>
        <h3>Primer apellido</h3>
        <p>{props.apellido1}</p>
        <h3>Segundo apellido</h3>
        <p>{props.apellido2}</p>
        <h3>DNI</h3>
        <p>{props.dni}</p>
      </div>
    </div>
  );
}