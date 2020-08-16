# Online Banking

Solución-implementación front-end de un online banking hecho con React (hooks) y Firebase, tomando el ejemplo de las vistas y componentes que tiene Santander de su web app.

#### Live demo

> https://santanderonlinebanking.netlify.app/

![desktop_version](https://ivancanga.github.io/gifOS/images/readme/desktop-version.png)

- **Features:**

- Sistema de registro con DNI y creación de caja de ahorro en $ y u$s, estos impactan generando un registro en cloud firestore, con un saldo inicial para hacer pruebas.

- Sistema de logeo a través de DNI con autenticación por Firebase.

- Implementación de una solución* para transferencias entre cuentas $ - u$s, verificando: datos del formulario correctos, transferencias denegadas al DNI origen, verificación de fondos suficientes, verificación de la existencia de cuenta destino, update del balance una vez finalizada con éxito la "transacción".


