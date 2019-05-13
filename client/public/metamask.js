/**
 * @fileoverview Fichero javascript encargado de recargar la página cada vez que se cambie de cuenta en Metamask.
 * 
 * @author Hans Sebastian Huaita Loyola
 */

const ethereum = window.ethereum;
var web3 = new Web3(ethereum);
var cuenta = localStorage.getItem('cuenta');
console.log("Cuenta actual: " + cuenta);
const logAccounts = accounts => {
  let cuentaNueva = accounts[0];
  if (cuenta !== cuentaNueva) {
    console.log("Cuenta cambiada: de " + cuenta + " a " + cuentaNueva);
    localStorage.setItem('cuenta', cuentaNueva); // Se guarda el valor de la cuenta nueva de Metamask
    location.reload();
  }
};
ethereum.on('accountsChanged', logAccounts);