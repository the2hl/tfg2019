/**
 * @fileoverview Componente contenedor que gestiona el acceso de un usuario a la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

// Imports
import React from 'react';
import Login from "./Login.jsx";

class Acceso extends React.Component {

    constructor(props) {
        super(props);

        // Estado del componente
        this.state = {

            /**
             * Propiedad que almacena la clave necesaria para llamar a un método del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null,
            /**
             * Propiedad que indica si el usuario está registrado en la app, es decir, si tiene un testamento asociado.
             *  @type {boolean}
             */
            isRegistrado: false,
            isAutenticado: false,
            isDesconectado: false,
            isCreador: false
        };

        // Binding de funciones auxiliares
        this.usuarioRegistrado = this.usuarioRegistrado.bind(this);
        this.usuarioAutenticado = this.usuarioAutenticado.bind(this);
    }

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.TFG;
        // Se informa a Drizzle que se va a llamar al método "isRegistrado"
        const dataKeyAux = contract.methods["isRegistrado"].cacheCall();
        console.log("Buscando si la cuenta actual está registrada...");
        // Se guarda el "dataKey" para usarlo después
        this.setState({ dataKey: dataKeyAux, isDesconectado: this.props.isDesconectado });
        if (this.props.isDesconectado) {
            console.log("Pasado como props: Está desconectado");
            this.setState({ isAutenticado: false });
        }
    }

    componentDidUpdate() {
        const { TFG } = this.props.drizzleState.contracts;
        const regAntiguo = this.state.isRegistrado;
        // Se obtiene la variable usando la "dataKey" guardada
        let resultadoReg = false;
        if (TFG.isRegistrado[this.state.dataKey]) {
            resultadoReg = (TFG.isRegistrado[this.state.dataKey].value);
        }
        if (regAntiguo !== resultadoReg) {
            if (resultadoReg) {
                console.log("Cuenta registrada: debe ingresar su contraseña.");
            } else {
                console.log("Cuenta no registrada: debe registrarse.");
            }
            this.setState({ isRegistrado: resultadoReg });
            this.usuarioRegistrado(resultadoReg);
        }
        let creadorAux = false;
        if (this.props.creadorDir === this.props.drizzleState.accounts[0]) {
            creadorAux = true;
            console.log("La cuenta actual es del superusuario");
        }
        if (creadorAux !== this.state.isCreador) {
            this.setState({ isCreador: creadorAux });
        }
    }

    usuarioRegistrado(resultado) {
        this.props.actionRegistrar(resultado);
    }

    usuarioAutenticado() {
        this.setState({ isAutenticado: true, isDesconectado: false });
        this.props.actionAutenticar();
    }

    render() {
        let htmlCodeAcceso;
        if ((this.state.isRegistrado && !this.state.isAutenticado && !this.state.isCreador) || this.props.isDesconectado) {
            htmlCodeAcceso = (
                <div>
                    <Login
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        action={this.usuarioAutenticado} />
                </div>
            );
        } else {
            htmlCodeAcceso = (<div></div>);
        }
        return (
            <div>
                {htmlCodeAcceso}
            </div>
        );
    }
}
export default Acceso;