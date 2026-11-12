#  Puesto de Chance API - Documentación Técnica

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Jest](https://img.shields.io/badge/Jest-29.x-red)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

##  Descripción General del Proyecto
El **Puesto de Chance API** es un sistema backend (API RESTful) diseñado para la gestión integral de un punto de venta de juegos de azar (Chance y Baloto). 

Este software resuelve la necesidad de digitalizar y asegurar el proceso de ventas de apuestas, garantizando que cada transacción cumpla con las reglas del negocio, se registre correctamente para auditorías y permita liquidar premios de forma automática, evitando errores humanos. 

El proyecto está construido bajo una arquitectura por capas, utiliza **Node.js** con **Express** y está diseñado para ser altamente testeable y documentado.

---

##  Reglas y Lógica del Negocio (¿Qué hace este sistema?)
Para entender el alcance del proyecto, el sistema implementa las siguientes reglas críticas:

1. **Autenticación y Roles:** El acceso está restringido mediante JWT. Existen dos roles: `ADMIN` (gestiona sorteos) y `VENDEDOR` (vende tickets y cierra caja).
2. **Validación de Apuestas (Chance):** 
   * Se valida que el valor de la apuesta esté entre los límites permitidos (500 a 50,000) y que sea múltiplo de 100.
   * Se manejan modalidades `DIRECTO` y `COMBINADO` (validando que un número no tenga todas sus cifras iguales al combinar).
3. **Control de Tiempos:** Los vendedores solo pueden anular un ticket dentro de los primeros `10 minutos` (configurable) después de la venta.
4. **Cierre de Caja:** El sistema permite generar un resumen diario y realizar el cierre, calculando si la caja quedó `CUADRADA`, `CON SOBRANTE` o `CON FALTANTE`.
5. **Liquidación Automática:** Al registrar el resultado de un sorteo, el sistema recorre todos los tickets activos y calcula automáticamente los premios según la tabla de pagos.

---

## 🛠 Requisitos del Sistema
Antes de instalar, asegúrese de contar con las siguientes herramientas:
- **Node.js**: versión `v18.0.0` o superior. (Descárgalo en nodejs.org).
- **npm**: versión `v9.0.0` o superior (se instala junto con Node.js).
- **Git**: para clonar el repositorio.
- **Editor de código**: Se recomienda Visual Studio Code.

---

##  Guía de Instalación Local Paso a Paso

Siga estos comandos en su terminal para desplegar el proyecto en su computadora:

**1. Clonar el repositorio:**
```bash
git clone https://github.com/villamildanna731-oss/Guia-9-3.4.git
cd documentacionApi