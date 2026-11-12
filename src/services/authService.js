const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../data/store');
const { jwtSecret, jwtExpiresIn } = require('../config');
const AppError = require('../utils/AppError');

/**
 * Autentica un usuario validando sus credenciales y genera un token JWT.
 * 
 * @description Se decidió hashear la contraseña con bcrypt antes de comparar
 * para evitar exposición de credenciales en logs y cumplir con el requisito de seguridad REQ-HU-001.
 * 
 * @param {string} usuario - Nombre de usuario registrado.
 * @param {string} password - Contraseña en texto plano recibida del cliente.
 * @returns {Object} Token JWT y datos básicos del perfil.
 * @throws {Error} Si las credenciales son inválidas (401) o el usuario está inactivo (403).
 * @traceability REQ-HU-001 (Historia de Usuario: Inicio de Sesión Seguro)
 */
function login(usuario, password) {
  if (!usuario || !password) throw new AppError('Usuario y contraseña son obligatorios');
  
  const encontrado = getDb().usuarios.find((u) => u.usuario === usuario);
  
  if (!encontrado || !bcrypt.compareSync(password, encontrado.password)) {
    throw new AppError('Credenciales inválidas', 401);
  }
  
  if (!encontrado.activo) throw new AppError('Usuario inactivo', 403);

  const token = jwt.sign({ id: encontrado.id, rol: encontrado.rol }, jwtSecret, { expiresIn: jwtExpiresIn });
  
  return { token, usuario: perfil(encontrado) };
}

function perfil(u) {
  return { id: u.id, usuario: u.usuario, nombre: u.nombre, rol: u.rol };
}

function buscarPorId(id) {
  return getDb().usuarios.find((u) => u.id === id);
}

module.exports = { login, perfil, buscarPorId };