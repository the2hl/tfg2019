import React from 'react';
import { Datos } from '../components/Datos.jsx';
class ContratoBuscado extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null
        };
    }

    componentDidMount() {
        const { drizzle, direccion } = this.props;
        const contract = drizzle.contracts.TFG;
        let dataKeyAux = contract.methods["contratos"].cacheCall(direccion);
        this.setState({ dataKey: dataKeyAux });
    }

    render() {
        const { TFG } = this.props.drizzleState.contracts;
        if (TFG.contratos[this.state.dataKey]) {
            let contrato = TFG.contratos[this.state.dataKey].value;
            let nombre = contrato.nombre;
            let apellido1 = contrato.apellido1;
            let apellido2 = contrato.apellido2;
            let dni = contrato.dni;
            return (
                <div>
                    <div className="box-controller" role="navigation">
                        <div
                            className={"controller " + (this.state.isDatosOpen ? "selected-controller" : "")}
                            onClick={this.showDatosBox}>
                            Datos
                        </div>
                        <div
                            className={"controller "}
                            onClick={this.props.action}>
                            Buscar otro
                        </div>
                    </div>
                    <div className="box-container" role="contentinfo">
                        <Datos cabecera="Contrato buscado" nombre={nombre} apellido1={apellido1} apellido2={apellido2} dni={dni} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default ContratoBuscado;