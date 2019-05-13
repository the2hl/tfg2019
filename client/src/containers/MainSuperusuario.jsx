import React from 'react';
import BuscarContrato from './BuscarContrato.jsx';
class MainSuperusuario extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            isBuscado: false,
            dniBuscado: "",
            errorDNI: ""
        };
        // Funciones auxiliares
        this.onDNIChange = this.onDNIChange.bind(this);
        this.buscarDNI = this.buscarDNI.bind(this);
        this.volverPagBusqueda = this.volverPagBusqueda.bind(this);
        this.contratoInexistente = this.contratoInexistente.bind(this);
    }

    onDNIChange(e) {
        this.setState({ dniBuscado: e.target.value });
    }

    buscarDNI() {
        let dni = this.state.dniBuscado;
        if (dni.length === 9) {
            console.log("DNI buscado: " + dni);
            this.setState({ isBuscado: true });
        } else {
            this.setState({ errorDNI: "Su DNI debe tener 9 caracteres", isBuscado: false });
        }
    }

    volverPagBusqueda() {
        this.setState({ isBuscado: false, dniBuscado: "" });
    }

    contratoInexistente() {
        this.setState({ errorDNI: "No existe ningún contrato con el DNI buscado", isBuscado: false })
    }

    render() {
        let htmlCode = "";
        if (this.state.isBuscado) {
            htmlCode = (
                <BuscarContrato
                    drizzle={this.props.drizzle}
                    drizzleState={this.props.drizzleState}
                    dni={this.state.dniBuscado}
                    action={this.volverPagBusqueda}
                    actionContInex={this.contratoInexistente}
                />
            );
        }
        else {
            htmlCode = (
                <div className="box-container" role="contentinfo">
                    <div className="inner-container">
                        <div className="header">
                            Buscar contrato
                        </div>
                        <div className="box">
                            <div className="input-group">
                                <label className="login-label" htmlFor="dni">DNI</label>
                                <input type="text" name="dni" id="contraseña" aria-label="dni"
                                    className="login-input" placeholder="Debe tener 9 caracteres" onChange={this.onDNIChange} />
                                <small className="danger-error">{this.state.errorDNI}</small>
                            </div>
                            <button type="button" className="login-btn" onClick={this.buscarDNI}>Buscar</button>
                        </div>
                    </div>
                </div >
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