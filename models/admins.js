const pool = require('../config/database');

const Administrador = {
    async login(correo) {
        try {
            const [rows] = await pool.query("SELECT * FROM Administradores WHERE correo = ?", [correo]);
            return rows;
        } catch (err) {
            console.error('Error en login:', err);
            throw err;
        }
    },

    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Administradores');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los administradores:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Administradores WHERE id_administrador = ?', [id]);
            return rows;
        } catch (err) {
            console.error('Error al obtener administrador por ID:', err);
            throw err;
        }
    },

    async create(administrador) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Administradores (nombre, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)',
                [administrador.nombre, administrador.correo, administrador.contrasena, administrador.id_rol]
            );
            return { id_administrador: result.insertId, ...administrador };
        } catch (err) {
            console.error('Error al crear administrador:', err);
            throw err;
        }
    },

    async update(id, administrador) {
        try {
            const [result] = await pool.query('UPDATE Administradores SET ? WHERE id_administrador = ?', [administrador, id]);
            return result;
        } catch (err) {
            console.error('Error al actualizar administrador:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM Administradores WHERE id_administrador = ?', [id]);
            return result;
        } catch (err) {
            console.error('Error al eliminar administrador:', err);
            throw err;
        }
    }
};

module.exports = Administrador;