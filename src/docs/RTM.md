# Matriz de Trazabilidad de Requisitos (RTM)

Esta matriz garantiza que cada requisito aprobado (Historia de Usuario) tenga un componente de código implementado y una prueba de calidad asociada.

| ID HU | Descripción Requisito | Módulo / Controlador | Caso de Prueba | Estado QA |
|-------|----------------------|---------------------|----------------|-----------|
| HU-001 | Inicio de sesión seguro | `src/services/authService.js` -> `login()` | `tests/auth.test.js` -> `test_login_exitoso()` | Aprobado |
| HU-002 | Registro y validación de apuestas | `src/services/chanceService.js` -> `validarApuesta()` | `tests/chance.test.js` -> `test_validacion_apuesta_invalida()` | Aprobado |
| HU-003 | Anulación de tickets de venta | `src/services/ticketService.js` -> `anular()` | `tests/tickets.test.js` -> `test_anulacion_ticket()` | Aprobado |
| HU-004 | Cierre de caja diario | `src/services/cajaService.js` -> `cerrar()` | `tests/caja.test.js` -> `test_cierre_caja_con_faltante()` | Aprobado |
| HU-005 | Registro de resultados y liquidación | `src/services/sorteoService.js` -> `registrarResultado()` | `tests/tickets.test.js` -> `test_resultado_y_pago_premio()` | Aprobado |