## ¿Qué es el testing?
Cada commit que se haga tendrá pruebas al software. El desarrollo tiene 4 etapas:

- Diseño
- Desarrollo
- Pruebas
- Produccion

Los errores detectados en una etapa mas avanzada será mas costosos de solucionar (a nivel monetario, en tiempo y en estabilidad del sistema).

Los problemas siempre van a existir, pero con el testing lo que hacemos es gestionar el riesgo cubriendo la mayor cantidad de escenarios esperados.

1. Analisis estaticos de error (en el editor de codigo): es instantaneo
1. Pruebas Unitarias: No es instantaneo y asegura que los bloques de codigo funcionan como esperamos. Podemos detectar bugs que no tuvimos en cuenta y ponemos a prueba nuestro software con casos de error.
1. Pruebas de Integracion: Asegurar que las pruebas unitarias no se bloqueen entre ellas
1. Revision de codigo: Luego de un pull request un ingeniero o administrador revisa la calidad del codigo.
1. QA: Equipos de testers que se encargan de testear la funcionalidad completa o la estresa para ver el resultado.

### Piramide del testing
         
        / \
       /U I\  --> Emulamos un dispositivo y simulamos pruebas reales 
      /-----\     (Enfocada al negocio)
     /  E2E  \  --> Se incluyen 3ros, como BD o API de 3ros. Se hacen de punta a punta
    /---------\
   /Integration\  --> Probamos como funcionan los bloques en conjunto
  /-------------\     (Enfocada a tecnología)
 /   Unit Test   \  --> Se corren directamente al codigo y se corren en forma desacoplada
/_________________\     (Enfocada a tecnología)

## Package
Para hacer los tests tecnicos se usara la libreria Jest. 
Para hacer UI testing se utilizaran otras librerias como Cypress, Puppeteer. 
Para hacer API testing podemos usar supertest

--------------------------------------------------------------------------------------------------------

### Pruebas Estaticas

Para estas pruebas usaremos eslint

>> npm i -D eslint

iniciamos eslint:

>> npx eslint --init 

Despues de responder todas las consultas de inicio se crea el archivo .eslintrc.js con los parametros de testing estatico del codigo.
Dentro de este archivo puedo agregar parametros que desee, por ejemplo para que lint reconozca las funciones del paquete jest lo sume en la seccion env como:

<code>
  {
    jest: true
  }
</code>

Observaciones:
  Para que no tire el error de salto de linea seleccionar la opcion correcta (CRLF o LF) desde la barra de estado a la derecha en el editor de VSCode.


### Pruebas con Jest

Los test se ejecutan con los archivos *.test.js (o .ts para typescript) y se ejecutan desde la terminal. Para ello agregamos el script dentro del pakage.json:

{
  "test": "jest"
}

>> npm run test

En el codigo de los archivos de testin la forma de declarar un test con jest es la siguiente:

test('nombre del test', () => {
  // codigo necesario para el test
  // ...

  // ejecuciones de validacion
  expect(validador).validationFunction();
});

Las funciones o validaciones pueden ser muchas, entre ellas:

- toBe(value)
- toEqual(value)
- toBeNull()
- toBeDefined()
- not.toBeUndefined()
- toBeFalsy()
- toMatch(value)
- toContain(value)
- ...

#### Setup / Teardown

- describe
- beforeAll
- afterAll
- beforeEach
- beforeEach

Full Example:

describe('Describe General Name', () => {
  beforeAll(() => {
    // commands to do before all tests
    // ex: DB run, connections, hooks, etc
  });

  afterAll(() => {
    // commands to do after all tests
    // ex: DB down, connections, hooks, etc
  });

  beforeEach(() => {
    // commands to run before each test
  });

  afterEach(() => {
    // commands to run after each test
  });

  describe('Describe Particular Name 1', () => {
    afterAll(() => {
      // commands to do after tests 1 and 2
      // ex: DB down, connections, hooks, etc
    });

    test('Test 1', () => {
      // commands to do in test 1
    });

    test('Test 2', () => {
      // commands to do in test 2
    });
  });

  describe('Describe Particular Name 2', () => {
    beforeAll(() => {
      // commands to do before tests 3 and 4
      // ex: DB run, connections, hooks, etc
    });

    test('Test 3', () => {
      // commands to do in test 3
    });

    test('Test 4', () => {
      // commands to do in test 4
    });
  });
});


#### Tipos de Pruebas

- Validacion: Se hace con el cliente y es un aspecto de negocio en el que se asegura que lo que se esta construyendo o se va a construir es el sistema correcto y realmente va a entregar valor.

- Verificar: Revisar regularmente si estamos construyendo el sistema correctamente para que entregue valor.

En una linea temporal tendremos diferentes SUT (System Under Test):

1. Requerimiento
  - Ejecuciones: Manuales como reuniones de necesidad con clientes
  - Objetivo: Validar las necesidades
  - Herramientas: Inspeccion con usuarios

1. Diseño / Arquitectura
  - Ejecucion: Manuales / Automaticas
  - Objetivo: Verificar quer las herramientas cumplan las necesidades
  - Herramientas: Case Tools

1. Desarrollo / Implementacion
  - Ejecucion: Automaticas (Unitarias / Integracion)
  - Objetivo: Verificar cumplimiento de las necesidades

División de pruebas:

2. Pruebas funcionales: Pruebas para validar y verificar nuestro codigo y desarrollo cumplen con los parametros y funcionalidades esperadas.

2. Pruebas No Funcionales: No verifican nuestros requisitos sino otros tipo de aspectos como:
  - Rendimiento
  - Carga o estabilidad
  - Estres
  - Usabilidad
  - Seguridad


#### Metodologias

1. TDD (Test Driven Development): Se basa en escribir primero la prueba que valida y verifica la funcionalidad y luego de pasar la prueba exitosamente escribir el codigo que la solucione y refactorizarlo. Sus pasos son:
  - Agregar prueba
  - Ver prueba fallar
  - Escribir codigo
  - Pasar prueba
  - Refactorizar codigo

1. BDD (Behaviour Driven Developmen): De acuerdo a los requisitos en funcion a casos reales empezamos a escribir las pruebas de lo que nos encontrariamos en produccion y lo que se encontraria el usuario final.


Conceptos para aplicar las metodologias:

2. AAA (Arrange-Act-Assert): Se visualiza en un ejemplo concreto:

  test('Multiplicacion', () => {
    // Arrange
    const a = 2;
    const b = 3;
    
    // Act
    const result = a * b;

    // Assert
    expect(result).toBe(6);
  });

2. Falso Positivo: Un examen que indica que hay una enfermedad/error cuando no la hay. Esto es comun cuando se escribe mal el caso de prueba.

2. Falso negativo: El test determina que no hay enfermedad/error cuando si lo hay. Es mas comun tener este caso debido a un bug que no detectamos en el codigo o porque el set de pruebas que armamos solo fue hecho para el "happy path" (el camino facil). Si no armo un set de pruebas que analise la mayor cantidad de posibilidades puedo caer en un bug. Para resolver el caso de un falso negativo se debe usar TDD, cuando un bug llega a produccion y todos nuestros test no previeron esa situacion, ir a revisar el codigo es de por si un error. Lo que se debe hacer es crear un caso TDD con ese escenario, se identifica el bug, se corrige y se hace el hot fix.


### Pruebas Unitarias

Todas las dependencias se emulan para representar su comportamiento. El concepto de unidad puede depender de muchos factores.

#### Coverage Test
El reporte de covertura de nuestras pruebas. Desde Jest, en la terminal:

>> npm run test -- --coverage

nos devuelve un reporte en formato html con el listado de lo que no tiene covertura.

#### Mockin, Stub y Doubles

- Dummy: Datos ficticios usados para rellenar informacion. Por ejemplo metodos que nos pide algun parametro.

- Fake: Simulan un objeto real y sirven para suplantar ciertos datos y comportamientos. Por ejemplo un usuario fake, su token, roles, etc.

- Stubs: Proveen respuestas preparadas y se pueden llamar durante el test para simular su comportamiento. Por ejemplo aplicaciones de tercero como apis de clima o OAuth.

- Spies: Pueden ser Stub pero puedo recolectar informacion de como fue llamado ese metodo para hacer pruebas de caja blanca.

- Mocks: Stubs + Spies, a veces pueden estar pre-programados. Por ejemplo en una llamada a 3ro se usa una llamada mockeada.

### Integration Test

Utilizamos la herramienta SUPERTEST

