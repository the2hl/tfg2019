/**
 * @fileoverview Componente contenedor que muestra los datos del testamento buscado por el superusuario.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import { Datos } from '../components/Datos.jsx'; // Componente visual hijo

class TestamentoBuscado extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "testamentos" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null
        };
    }

    /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

    componentDidMount() {
        const { drizzle, direccion } = this.props;
        const contract = drizzle.contracts.LastWillManager;
        // Se informa a Drizzle de que se va a llamar al método "testamentos"
        let dataKeyAux = contract.methods["testamentos"].cacheCall(direccion);
        // Se guarda la "dataKey" para usarlo después
        this.setState({ dataKey: dataKeyAux });
    }

    render() {
        const { LastWillManager } = this.props.drizzleState.contracts;
        if (LastWillManager.testamentos[this.state.dataKey]) {
            // Se obtiene el resultado de llamar al método "buscarTestamento" usando la "dataKey" guardada
            let contrato = LastWillManager.testamentos[this.state.dataKey].value;
            let nombre = contrato.nombre;
            let apellido1 = contrato.apellido1;
            let apellido2 = contrato.apellido2;
            let dni = contrato.dni;
            return (
                <div>
                    <div className="box-controller" role="navigation">
                        <div className="controller selected-controller">
                            Datos
                        </div>
                        <div
                            className={"controller "}
                            onClick={this.props.actionVolver}>
                            Buscar otro
                        </div>
                    </div>
                    <div className="box-container" role="contentinfo">
                        <Datos cabecera="Contrato buscado" nombre={nombre} apellido1={apellido1} apellido2={apellido2} dni={dni} />
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}
export default TestamentoBuscado;