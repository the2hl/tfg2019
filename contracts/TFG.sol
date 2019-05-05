pragma solidity ^0.5.0;

contract TFG {

  struct Contrato{
    uint id; // Identificador del contrato
    string nombre; // Nombre del propietario del contrato
    string apellido1; // Primer apellido del propietario del contrato
    string apellido2; // Segundo apellido del propietario del contrato
    string dni; // DNI del propietario del contrato
    string passwordHash; // Hash de la contraseña del propietario del contrato
    string ipfsHash; // Hash IPFS del contrato
  }

  uint public identificador = 1;

  uint public nContratos;

  uint[] public contratosKeys;

  mapping (uint => Contrato) public contratos;

  /***** EVENTOS *****/

  event ContratoCreado(
    uint id,
    string nombre,
    string apellido1,
    string apellido2,
    string dni,
    string passwordHash
  );

  event NombreCambiado(uint id, string nombre);

  event Apellido1Cambiado(uint id, string apellido1);

  event Apellido2Cambiado(uint id, string apellido2);

  event DNICambiado(uint id, string dni);

  event IPFSHashCambiado(uint id, string ipfsHash);

  /***** FUNCIONES *****/

  function nuevoContrato(string memory _nombre, string memory _apell1, string memory _apell2, string memory _dni, string memory _pwHash) public {
    emit ContratoCreado(identificador,_nombre, _apell1, _apell2, _dni, _pwHash);
    contratos[identificador] = Contrato(identificador, _nombre, _apell1, _apell2, _dni, _pwHash, "");
    contratosKeys.push(identificador);
    identificador++;
    nContratos++;
  }

  /*
  Es view porque toma datos del estado del contrato. Al ser view, no se pueden emitir eventos
  Si el DNI y el hash son erróneos, se devuelve -3
  Si el DNI es incorrecto pero el hash es correcto, se devuelve -2
  Si el DNI es correcto pero el hash es incorrecto, se devuelve -1
  Si el DNI y el hash son correctos, se devuelve la posición del contrato
  */
  function  buscarContrato(string memory _dni, string memory _pwHash) public view returns (int){
    bool dniCorrecto = false;
    uint posDni = 0;
    uint posPW = 0;
    bool pwCorrecto = false;
    for(uint i = 1; i<=nContratos;i++){
      if(compararStrings(contratos[i].dni, _dni)){
        dniCorrecto = true;
        posDni = i;
        break;
      }
    }
    for(uint i = 1; i<=nContratos;i++){
      if(compararStrings(contratos[i].passwordHash, _pwHash)){
        pwCorrecto = true;
        posPW = i;
        break;
      }
    }
    if(dniCorrecto&&!pwCorrecto){
      return -1;
    }
    if(pwCorrecto&&!dniCorrecto){
      return -2;
    }
    if(posDni == posPW && posDni > 0){
      return int(posDni);
    }
    return -3;
  }

  function cambiarNombre(uint _id, string memory _nuevo) public{
    emit NombreCambiado(_id, _nuevo);
    contratos[_id].nombre = _nuevo;
  }

  function cambiarApellido1(uint _id, string memory _nuevo) public{
    emit Apellido1Cambiado(_id, _nuevo);
    contratos[_id].apellido1 = _nuevo;
  }

  function cambiarApellido2(uint _id, string memory _nuevo) public{
    emit Apellido2Cambiado(_id, _nuevo);
    contratos[_id].apellido2 = _nuevo;
  }

  function cambiarDNI(uint _id, string memory _nuevo) public{
    emit DNICambiado(_id, _nuevo);
    contratos[_id].dni = _nuevo;
  }

  function cambiarIPFSHash(uint _id, string memory _nuevo) public{
    emit IPFSHashCambiado(_id, _nuevo);
    contratos[_id].ipfsHash = _nuevo;
  }

  // Es puro porque no toma datos del estado del contrato
  function compararStrings(string memory _s1, string memory _s2) public pure returns (bool){
    return keccak256(abi.encodePacked(_s1)) == keccak256(abi.encodePacked(_s2));
  }

}