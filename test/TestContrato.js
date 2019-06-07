const LastWillManager = artifacts.require("./LastWillManager.sol");
const Sha256 = require("/home/hhl/tfg/client/node_modules/js-sha256");

/**
 * Fichero para probar los métodos del contrato Ethereum de la app.
 * Autor: Hans Sebastian Huaita Loyola.
 */

contract("LastWillManager", accounts => {
  it("Añadir contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const hash = Sha256("the2hl");
    // Añadir un nuevo contrato
    await TestamentosManager.nuevoTestamento("Hans", "Huaita", "Loyola", "03235558X", hash);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const nombre = Testamento.nombre;
    const apellido1 = Testamento.apellido1;
    const apellido2 = Testamento.apellido2;
    const dni = Testamento.dni;
    const passwordHash = Testamento.passwordHash;
    const nTestamentos = await TestamentosManager.nTestamentos.call();
    // Comparaciones
    assert.equal(nTestamentos, 1, "El contrato 1 no fue añadido");
    assert.equal(nombre, "Hans", "El nombre es erróneo");
    assert.equal(apellido1, "Huaita", "El primer apellido es erróneo");
    assert.equal(apellido2, "Loyola", "El segundo apellido es erróneo");
    assert.equal(dni, "03235558X", "El DNI es erróneo");
    assert.equal(passwordHash, hash, "La contraseña es errónea");
  });
  it("Añadir contrato 2", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const hash = Sha256("prueba");
    // Añadir un nuevo contrato
    await TestamentosManager.nuevoTestamento("Diego Arturo", "Huaita", "Loyola", "00000001A", hash);
    const nTestamentos = await TestamentosManager.nTestamentos.call();
    // Comparaciones
    assert.equal(nTestamentos, 1, "El contrato 2 sí fue añadido");
  });
  it("Buscar contrato 1 con DNI incorrecto", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const dni = "12345678A";
    // Buscar un contrato
    const resultado = await TestamentosManager.buscarTestamento(dni);
    // Comparaciones
    assert.equal(resultado, 0, "El contrato 1 se encontró");
  });
  it("Buscar contrato 1 con DNI correcto", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const dni = "03235558X";
    // Buscar un contrato
    const resultado = await TestamentosManager.buscarTestamento(dni);
    const dir = accounts[0];
    // Comparaciones
    assert.equal(resultado, dir, "El contrato 1 no se encontró");
  });
  it("Autenticar contrato 1 con hash incorrecto", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const hash = Sha256("random");
    // Buscar un contrato
    const resultado = await TestamentosManager.autenticar(hash);
    // Comparaciones
    assert.equal(resultado, false, "El contrato 1 se encontró");
  });
  it("Autenticar contrato 1 con hash correcto", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const hash = Sha256("the2hl");
    // Buscar un contrato
    const resultado = await TestamentosManager.autenticar(hash);
    // Comparaciones
    assert.equal(resultado, true, "El contrato 1 no se encontró");
  });
  it("Cambiar el nombre del propietario del contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const nuevo = "Juan";
    // Cambiar de nombre al usuario actual de la app
    await TestamentosManager.cambiarNombre(nuevo);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const nombre = Testamento.nombre;
    // Comparaciones
    assert.equal(nombre, nuevo, "El nombre no se ha cambiado");
  });
  it("Cambiar el primer apellido del propietario del contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const nuevo = "Nieve";
    // Cambiar de primer apellido al usuario actual de la app
    await TestamentosManager.cambiarApellido1(nuevo);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const apellido1 = Testamento.apellido1;
    // Comparaciones
    assert.equal(apellido1, nuevo, "El primer apellido no se ha cambiado");
  });
  it("Cambiar el segundo apellido del propietario del contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const nuevo = "Smith";
    // Cambiar de segundo apellido al usuario actual de la app
    await TestamentosManager.cambiarApellido2(nuevo);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const apellido2 = Testamento.apellido2;
    // Comparaciones
    assert.equal(apellido2, nuevo, "El segundo apellido no se ha cambiado");
  });
  it("Cambiar el DNI del propietario del contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const nuevo = "1234578Z";
    // Cambiar de DNI al usuario actual de la app
    await TestamentosManager.cambiarDNI(nuevo);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const dni = Testamento.dni;
    // Comparaciones
    assert.equal(dni, nuevo, "El DNI no se ha cambiado");
  });
  it("Cambiar el hash IPFS del contrato 1", async () => {
    const TestamentosManager = await LastWillManager.deployed();
    const nuevo = "1a2b3c4d5e6f7g8h9i";
    // Cambiar de DNI al usuario actual de la app
    await TestamentosManager.cambiarIPFSHash(nuevo);
    const TestamentoDir = await TestamentosManager.testamentosDirs.call(0);
    const Testamento = await TestamentosManager.testamentos.call(TestamentoDir);
    const ipfsHash = Testamento.ipfsHash;
    // Comparaciones
    assert.equal(ipfsHash, nuevo, "El DNI no se ha cambiado");
  });
});