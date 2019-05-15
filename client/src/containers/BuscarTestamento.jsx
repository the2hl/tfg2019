/**
 * @fileoverview Componente contenedor que gestiona el testamento buscado por el superusuario.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import TestamentoBuscado from './TestamentoBuscado.jsx'; // Componente contenedor hijo

class BuscarTestamento extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "buscarTestamento" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null,
            /**
             * Propiedad que indica si el testamento buscado está registrado en la app.
             *  @type {boolean}
             */
            isRegistrado: false,
            /**
             * Propiedad que almacena la dirección del testamento buscado.
             *  @type {string}
             */
            dirBuscada: null
        };

        // Binding de las funciones auxiliares
        this.crearTraza = this.crearTraza.bind(this);
    }

    /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

    componentDidMount() {
        const { drizzle, dni } = this.props;
        const contract = drizzle.contracts.LastWillManager;
        // Se informa a Drizzle de que se va a llamar al método "buscarTestamento"
        let dataKeyAux = contract.methods["buscarTestamento"].cacheCall(dni);
        // Se guarda la "dataKey" para usarlo después
        this.setState({ dataKey: dataKeyAux });
    }

    componentDidUpdate() {
        const { LastWillManager } = this.props.drizzleState.contracts;
        if (LastWillManager.buscarTestamento[this.state.dataKey]) {
            // Se obtiene el resultado de llamar al método "buscarTestamento" usando la "dataKey" guardada
            let dirAux = LastWillManager.buscarTestamento[this.state.dataKey].value;
            let registrado;
            // Si la dirección del testamento buscado es nula
            if (dirAux === '0x0000000000000000000000000000000000000000') {
                this.crearTraza("Dirección del contrato buscado: " + dirAux);
                this.crearTraza("No existe contrato con el DNI buscado");
                registrado = false;
                this.props.actionContInex();
                // Se actualiza el estado solo si se ha producido un cambio
                if (this.state.isRegistrado) {
                    this.setState({ isRegistrado: registrado });
                }
            } else {
                registrado = true;
                // Se actualiza el estado solo si se ha producido un cambio
                if (!this.state.isRegistrado) {
                    this.setState({ isRegistrado: registrado });
                    this.crearTraza("Dirección del contrato buscado: " + dirAux);
                    this.crearTraza("Sí existe contrato con el DNI buscado");
                }
                // Se actualiza el estado solo si se ha producido un cambio
                if (dirAux !== this.state.dirBuscada) {
                    this.setState({ dirBuscada: dirAux });
                }
            }


        }
    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "BuscarTestamento: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    render() {
        // Si el testamento buscado está registrado en la app y su dirección existe
        if (this.state.isRegistrado && this.state.dirBuscada) {
            return (
                <div>
                    <TestamentoBuscado
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        direccion={this.state.dirBuscada}
                        actionVolver={this.props.actionVolver}
                    />
                </div>);
        } else {
            return (<div></div>);
        }
    }
}
export default BuscarTestamento;