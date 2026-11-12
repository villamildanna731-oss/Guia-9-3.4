const { Router } = require('express');
const { autenticar, permitir } = require('../middlewares/auth');
const auth = require('../controllers/authController');
const sorteos = require('../controllers/sorteoController');
const tickets = require('../controllers/ticketController');
const caja = require('../controllers/cajaController');

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Autenticar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuario, password]
 *             properties:
 *               usuario: { type: string, example: 'vendedor1' }
 *               password: { type: string, example: 'vende123' }
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/auth/login', auth.login);

/**
 * @openapi
 * /api/v1/sorteos:
 *   get:
 *     summary: Listar sorteos
 *     tags: [Sorteos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sorteos
 */
router.get('/sorteos', autenticar, sorteos.listar);

router.get('/sorteos/:id', autenticar, sorteos.obtener);
router.post('/sorteos', autenticar, permitir('ADMIN'), sorteos.crear);
router.post('/sorteos/:id/resultado', autenticar, permitir('ADMIN'), sorteos.registrarResultado);

/**
 * @openapi
 * /api/v1/tickets/chance:
 *   post:
 *     summary: Vender un ticket de chance
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Venta exitosa
 */
router.post('/tickets/chance', autenticar, permitir('VENDEDOR'), tickets.venderChance);

router.post('/tickets/baloto', autenticar, permitir('VENDEDOR'), tickets.venderBaloto);

/**
 * @openapi
 * /api/v1/tickets:
 *   get:
 *     summary: Listar tickets de venta
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets
 */
router.get('/tickets', autenticar, tickets.listar);

router.get('/tickets/:codigo', autenticar, tickets.consultar);
router.post('/tickets/:codigo/anular', autenticar, tickets.anular);
router.post('/tickets/:codigo/pagar', autenticar, permitir('VENDEDOR'), tickets.pagar);

/**
 * @openapi
 * /api/v1/caja/resumen:
 *   get:
 *     summary: Obtener resumen de caja diario
 *     tags: [Caja]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen de caja
 */
router.get('/caja/resumen', autenticar, caja.resumen);

router.post('/caja/cierre', autenticar, permitir('VENDEDOR'), caja.cerrar);

module.exports = router;