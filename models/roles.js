const pool = require('../config/database');

const Rol = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Roles');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los roles:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Roles WHERE id_rol = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener rol por ID:', err);
            throw err;
        }
    },

    async create(rol) {
        try {
            const { nombre, descripcion } = rol;
            const [result] = await pool.query(
                'INSERT INTO Roles (nombre, descripcion) VALUES (?, ?)',
                [nombre, descripcion]
            );
            return { id_rol: result.insertId, ...rol };
        } catch (err) {
            console.error('Error al crear rol:', err);
            throw err;
        }
    },

    async update(id, rol) {
        try {
            const { nombre, descripcion } = rol;
            const [result] = await pool.query(
                'UPDATE Roles SET nombre = ?, descripcion = ? WHERE id_rol = ?',
                [nombre, descripcion, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar rol:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Roles WHERE id_rol = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar rol:', err);
            throw err;
        }
    }
};

module.exports = Rol;