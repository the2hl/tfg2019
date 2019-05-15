/**
 * @fileoverview Componente contenedor que gestiona el acceso de un usuario a la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import MainSuperusuario from "./MainSuperusuario.jsx"; // Componente contenedor hijo
import MainUsuario from "./MainUsuario.jsx"; // Componente contenedor hijo
import Login from "./Login.jsx"; // Componente contenedor hijo
import RegistrarTestamento from "./RegistrarTestamento.jsx"; // Componente contenedor hijo
import { Creditos } from '../components/Creditos'; // Componente visual hijo

class Acceso extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "isRegistrado" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKeyReg: null,
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "superusuario" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKeySuper: null,
            /**
             * Propiedad que indica si el usuario está registrado en la app, es decir, si tiene un testamento asociado.
             *  @type {boolean}
             */
            isRegistrado: false,
            /**
             * Propiedad que indica si el usuario está autenticado en la app, es decir, si ha iniciado sesión introduciendo su contraseña.
             *  @type {boolean}
             */
            isIniciadoSesion: false,
            /**
             * Propiedad que indica si se trata del superusuario, es decir, si es la cuenta que desplegó el contrato Ethereum.
             *  @type {boolean}
             */
            isSuperUsuario: false,
            /**
             * Propiedad que indica si está abierta la pestaña de Registro.
             *  @type {boolean}
             */
            isRegistroAbierto: true,
            /**
             * Propiedad que indica si está abierta la pestaña de Créditos.
             *  @type {boolean}
             */
            isCreditosAbierto: false
        };

        // Binding de las funciones auxiliares
        this.crearTraza = this.crearTraza.bind(this);
        this.usuarioAutenticado = this.usuarioAutenticado.bind(this);
        this.mostrarRegistro = this.mostrarRegistro.bind(this);
        this.mostrarCreditos = this.mostrarCreditos.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.LastWillManager;
        // Se informa a Drizzle de que se va a llamar al método "isRegistrado"
        const dataKeyRegAux = contract.methods["isRegistrado"].cacheCall();
        this.crearTraza("Buscando si la cuenta actual está registrada...");
        // Se informa a Drizzle de que se va a llamar al método "superusuario"
        const dataKeySupAux = contract.methods["superusuario"].cacheCall();
        this.crearTraza("Buscando si la cuenta actual es del superusuario...");
        // Se guarda la "dataKeyReg" y "dataKeySuper" para usarla después
        this.setState({ dataKeyReg: dataKeyRegAux, dataKeySuper: dataKeySupAux });
    }

    componentDidUpdate() {
        const { LastWillManager } = this.props.drizzleState.contracts;

        if (LastWillManager.isRegistrado[this.state.dataKeyReg]) {
            // Se obtiene el resultado de llamar al método "isRegistrado" usando la "dataKeyReg" guardada
            let resultadoReg = (LastWillManager.isRegistrado[this.state.dataKeyReg].value);

            // Se actualiza el estado solo si se ha producido un cambio
            if (this.state.isRegistrado !== resultadoReg) {
                if (resultadoReg) {
                    this.crearTraza("Cuenta registrada: debe ingresar su contraseña.");
                } else {
                    this.crearTraza("Cuenta no registrada: debe registrarse.");
                }
                this.setState({ isRegistrado: resultadoReg });
            }
        }

        if (LastWillManager.superusuario[this.state.dataKeySuper]) {
            let creadorAux = false;
            let superusuarioDir = (LastWillManager.superusuario[this.state.dataKeySuper].value);
            // Si la dirección de la cuenta actual es la del superusuario
            if (superusuarioDir === this.props.drizzleState.accounts[0]) {
                creadorAux = true;
            }
            // Se actualiza el estado solo si se ha producido un cambio
            if (creadorAux !== this.state.isSuperUsuario) {
                if (creadorAux) {
                    this.crearTraza("La cuenta actual es del superusuario");
                } else {
                    this.crearTraza("La cuenta actual no es del superusuario");
                }
                this.setState({ isSuperUsuario: creadorAux });
            }
        }

    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que se llama cuando el usuario ha iniciado sesión en la app.
     */
    usuarioAutenticado() {
        this.setState({ isIniciadoSesion: true });
    }

    /**
     * Función que muestra la pestaña "Registro".
     */
    mostrarRegistro() {
        this.setState({ isRegistroAbierto: true, isCreditosAbierto: false });
    }

    /**
     * Función que muestra la pestaña "Créditos".
     */
    mostrarCreditos() {
        this.setState({ isCreditosAbierto: true, isRegistroAbierto: false });
    }

    /**
     * Función que se llama cuando el usuario ha cerrado sesión en la app.
     */
    cerrarSesion() {
        this.setState({ isIniciadoSesion: false });
    }

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "Acceso: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    render() {
        let htmlCodeAcceso = "";
        if (this.state.isSuperUsuario) { // Si la cuenta es del superusuario
            htmlCodeAcceso = (
                <div>
                    <MainSuperusuario
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                    />
                </div>
            );
        } else if (!this.state.isRegistrado) { // Si el usuario no está registrado
            htmlCodeAcceso = (
                <div>
                    <div className="box-controller" role="navigation">
                        <div
                            className={"controller " + (this.state.isRegistroAbierto ? "selected-controller" : "")}
                            onClick={this.mostrarRegistro}>
                            Registro
                        </div>
                        <div
                            className={"controller " + (this.state.isCreditosAbierto ? "selected-controller" : "")}
                            onClick={this.mostrarCreditos}>
                            Créditos
                        </div>
                    </div>
                    <div className="box-container" role="contentinfo">
                        {this.state.isRegistroAbierto &&
                            <RegistrarTestamento
                                drizzle={this.props.drizzle}
                                drizzleState={this.props.drizzleState} />}
                        {this.state.isCreditosAbierto && <Creditos />}
                    </div>
                </div>
            );
        } else if (!this.state.isIniciadoSesion) {
            htmlCodeAcceso = (
                <div>
                    <Login
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        actionAutenticar={this.usuarioAutenticado} />
                </div>
            );
        } else {
            htmlCodeAcceso = (
                <div>
                    <MainUsuario
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        action={this.cerrarSesion}
                    />
                </div>
            );
        }

        return (
            <div>
                {htmlCodeAcceso}
            </div>
        );
    }
}
export default Acceso;