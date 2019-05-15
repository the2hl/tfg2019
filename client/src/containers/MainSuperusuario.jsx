/**
 * @fileoverview Componente contenedor que gestiona las pantallas que ve el superusuario.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import BuscarTestamento from './BuscarTestamento.jsx'; // Componente contenedor hijo
import { BusquedaTestamento } from '../components/BusquedaTestamento.jsx'; // Componente visual hijo

class MainSuperusuario extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "isRegistrado" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null,
            /**
             * Propiedad que indica si se muestra la página de búsqueda de un testamento.
             *  @type {boolean}
             */
            mostrarPagBusq: true,
            /**
             * Propiedad que almacena el dni introducido por el superusuario.
             *  @type {string}
             */
            dniBuscado: "",
            /**
             * Propiedad que almacena el mensaje de error en relación al dni introducido por el superusuario.
             *  @type {string}
             */
            errorDNI: ""
        };

        // Binding de las funciones auxiliares
        this.crearTraza = this.crearTraza.bind(this);
        this.onDNIChange = this.onDNIChange.bind(this);
        this.buscarTestamento = this.buscarTestamento.bind(this);
        this.mostrarPagBusqeda = this.mostrarPagBusqeda.bind(this);
        this.testamentoNoRegistrado = this.testamentoNoRegistrado.bind(this);
    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que almacena el dni introducido por el superusuario.
     * @param {*} event 
     */
    onDNIChange(event) {
        this.setState({ dniBuscado: event.target.value });
    }

    /**
     * Función que se llama cuando el superusario introduce el dni asociado al testamento que quiere buscar y pulsa el botón "Buscar".
     * @param {*} event
     */
    buscarTestamento(event) {
        event.preventDefault(); // Evita que se recargue la página al hacer submit. Necesario en React.
        let dni = this.state.dniBuscado;
        if (dni.length === 9) {
            this.crearTraza("DNI buscado: " + dni);
            this.setState({ mostrarPagBusq: false });
        } else {
            this.setState({ errorDNI: "Su DNI debe tener 9 caracteres", mostrarPagBusq: true });
        }
    }

    /**
     * Función que se llama para mostrar la página de búsqueda de un testamento.
     */
    mostrarPagBusqeda() {
        this.setState({ mostrarPagBusq: true, dniBuscado: "", errorDNI: "" });
    }

    /**
     * Función que se llama cuando el contrato buscado no está registrado en la app.
     */
    testamentoNoRegistrado() {
        this.setState({ errorDNI: "No existe ningún testamento con el DNI buscado", mostrarPagBusq: true })
    }

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "MainSuperusuario: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    render() {
        let htmlCode = "";
        if (!this.state.mostrarPagBusq) {
            htmlCode = (
                <BuscarTestamento
                    drizzle={this.props.drizzle}
                    drizzleState={this.props.drizzleState}
                    dni={this.state.dniBuscado}
                    actionVolver={this.mostrarPagBusqeda}
                    actionContInex={this.testamentoNoRegistrado}
                />
            );
        } else {
            htmlCode = (
                <BusquedaTestamento
                    buscarTestamento={this.buscarTestamento}
                    onDNIChange={this.onDNIChange}
                    errorDNI={this.state.errorDNI}
                />
            );
        }

        return (
            <div>
                {htmlCode}
            </div>
        );
    }
}
export default MainSuperusuario;