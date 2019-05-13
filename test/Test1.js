const TFG = artifacts.require("./TFG.sol");
const Sha256 = require("/home/hhl/tfg/client/node_modules/js-sha256");

contract("TFG", accounts => {
  it("Añadir contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("the2hl");
    // Añadir un nuevo contrato
    await TFGStore.nuevoContrato("Hans", "Huaita", "Loyola", "03235558X", hash);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const nombre = Contrato.nombre;
    const apellido1 = Contrato.apellido1;
    const apellido2 = Contrato.apellido2;
    const dni = Contrato.dni;
    const passwordHash = Contrato.passwordHash;
    const nContratos = await TFGStore.nContratos.call();
    // Comparaciones
    assert.equal(nContratos, 1, "El contrato 1 no fue añadido");
    assert.equal(nombre, "Hans", "El nombre es erróneo");
    assert.equal(apellido1, "Huaita", "El primer apellido es erróneo");
    assert.equal(apellido2, "Loyola", "El segundo apellido es erróneo");
    assert.equal(dni, "03235558X", "El DNI es erróneo");
    assert.equal(passwordHash, hash, "La contraseña es errónea");
  });
  it("Añadir contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("prueba");
    // Añadir un nuevo contrato
    await TFGStore.nuevoContrato("Diego Arturo", "Huaita", "Loyola", "00000001A", hash);
    const nContratos = await TFGStore.nContratos.call();
    // Comparaciones
    assert.equal(nContratos, 1, "El contrato 2 sí fue añadido");
  });
  it("Buscar contrato 1 con DNI incorrecto", async () => {
    const TFGStore = await TFG.deployed();
    const dni = "12345678A";
    // Buscara un contrato
    const resultado = await TFGStore.buscarContrato(dni);
    // Comparaciones
    assert.equal(resultado, 0, "El contrato 1 se encontró");
  });
  it("Buscar contrato 1 con DNI correcto", async () => {
    const TFGStore = await TFG.deployed();
    const dni = "03235558X";
    // Buscara un contrato
    const resultado = await TFGStore.buscarContrato(dni);
    const dir = accounts[0];
    // Comparaciones
    assert.equal(resultado, dir, "El contrato 1 no se encontró");
  });
  it("Autenticar contrato 1 con hash incorrecto", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("random");
    // Buscara un contrato
    const resultado = await TFGStore.autenticar(hash);
    // Comparaciones
    assert.equal(resultado, false, "El contrato 1 se encontró");
  });
  it("Autenticar contrato 1 con hash correcto", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("the2hl");
    // Buscara un contrato
    const resultado = await TFGStore.autenticar(hash);
    // Comparaciones
    assert.equal(resultado, true, "El contrato 1 no se encontró");
  });
  it("Cambiar el nombre del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Juan";
    // Cambiar de nombre al propietario de un contrato
    await TFGStore.cambiarNombre(nuevo);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const nombre = Contrato.nombre;
    // Comparaciones
    assert.equal(nombre, nuevo, "El nombre no se ha cambiado");
  });
  it("Cambiar el primer apellido del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Nieve";
    // Cambiar de primer apellido al propietario de un contrato
    await TFGStore.cambiarApellido1(nuevo);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const apellido1 = Contrato.apellido1;
    // Comparaciones
    assert.equal(apellido1, nuevo, "El primer apellido no se ha cambiado");
  });
  it("Cambiar el segundo apellido del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Smith";
    // Cambiar de segundo apellido al propietario de un contrato
    await TFGStore.cambiarApellido2(nuevo);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const apellido2 = Contrato.apellido2;
    // Comparaciones
    assert.equal(apellido2, nuevo, "El segundo apellido no se ha cambiado");
  });
  it("Cambiar el DNI del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "1234578Z";
    // Cambiar de DNI al propietario de un contrato
    await TFGStore.cambiarDNI(nuevo);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const dni = Contrato.dni;
    // Comparaciones
    assert.equal(dni, nuevo, "El DNI no se ha cambiado");
  });
  it("Cambiar el hash IPFS del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "1a2b3c4d5e6f7g8h9i";
    // Cambiar de DNI al propietario de un contrato
    await TFGStore.cambiarIPFSHash(nuevo);
    const ContratoDir = await TFGStore.contratosDirs.call(0);
    const Contrato = await TFGStore.contratos.call(ContratoDir);
    const ipfsHash = Contrato.ipfsHash;
    // Comparaciones
    assert.equal(ipfsHash, nuevo, "El DNI no se ha cambiado");
  });
});