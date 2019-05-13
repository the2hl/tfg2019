import React from 'react';
import ContratoBuscado from './ContratoBuscado.jsx';
class BuscarContrato extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            isInexistente: false,
            dirBuscada: null
        };
        this.contratoInexistente = this.contratoInexistente.bind(this);
    }

    componentDidMount() {
        const { drizzle, dni } = this.props;
        const contract = drizzle.contracts.TFG;
        let dataKeyAux = contract.methods["buscarContrato"].cacheCall(dni);
        this.setState({ dataKey: dataKeyAux });
    }

    componentDidUpdate() {
        const { TFG } = this.props.drizzleState.contracts;
        if (TFG.buscarContrato[this.state.dataKey]) {
            let dirAux = TFG.buscarContrato[this.state.dataKey].value;
            console.log("Dirección del contrato buscado: " + dirAux);
            let inexistente;
            if (dirAux === '0x0000000000000000000000000000000000000000') {
                console.log("No existe contrato con el DNI buscado");
                inexistente = true;
            } else {
                inexistente = false;
                console.log("Sí existe contrato con el DNI buscado");
                if (dirAux !== this.state.dirBuscada) {
                    this.setState({ dirBuscada: dirAux });
                }
            }
            if (inexistente !== this.state.isInexistente) {
                this.contratoInexistente();
            }

        }
    }

    contratoInexistente() {
        this.setState({ isInexistente: true });
        this.props.actionContInex();
    }

    render() {
        if (!this.state.isInexistente && this.state.dirBuscada) {
            return (
                <div>
                    <ContratoBuscado
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        direccion={this.state.dirBuscada}
                        action={this.props.action}
                    />
                </div>);
        } else {
            return (<div></div>);
        }
    }
}
export default BuscarContrato;