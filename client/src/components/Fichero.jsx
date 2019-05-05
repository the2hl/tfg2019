import React from 'react';

export const Fichero = (props) => {
  return (
    <div className="inner-container">
      <div className="header">
        Mi testamento
      </div>
      <div className="box">
        <h3>Fichero subido</h3>
        {props.htmlFile}
        <h4>Subir fichero</h4>
        <form onSubmit={props.onSubmit} >
          <input type='file' onChange={props.capturarFichero} />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
}