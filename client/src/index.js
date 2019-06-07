import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import * as serviceWorker from './serviceWorker';

// Importar las funciones de Drizzle y el artefacto del contrato
import { Drizzle, generateStore } from "drizzle";
import LastWillManager from "./contracts/LastWillManager.json";

// Informar a Drizzle qué contrato vamos a usar
const options = { contracts: [LastWillManager] };

// Configurar la Store de Drizzle y Drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
