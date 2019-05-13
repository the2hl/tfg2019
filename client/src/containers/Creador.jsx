import React from 'react';
class Creador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            creadorDir: null,
        };
    }

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.TFG;
        // Se informa a Drizzle que se va a llamar al método "buscarContrato" con los parámetros "dni, hash"
        const dataKeyAux = contract.methods["creador"].cacheCall();
        // Se guarda el "dataKey" para usarlo después
        this.setState({ dataKey: dataKeyAux });
    }

    componentDidUpdate() {
        const { TFG } = this.props.drizzleState.contracts;
        const antiguo = this.state.creadorDir;
        // Se obtiene la variable usando la "dataKey" guardada
        let nuevo;
        if (TFG.creador[this.state.dataKey]) {
            nuevo = (TFG.creador[this.state.dataKey].value);
        }
        if (nuevo !== antiguo && nuevo !== undefined) {
            console.log("Cuenta del superusuario: " + nuevo);
            this.setState({ creadorDir: nuevo });
            this.props.action(nuevo);
        }
    }

    render() {
        return (
            <div >
            </div>
        );
    }
}
export default Creador;