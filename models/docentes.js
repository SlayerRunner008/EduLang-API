const pool = require('../config/database');

const Docente = {
    async login(correo) {
        try {
            const [rows] = await pool.query("SELECT * FROM Docentes WHERE correo = ?", [correo]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error en login:', err);
            throw err;
        }
    },

    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Docentes');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los docentes:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Docentes WHERE id_docente = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener docente por ID:', err);
            throw err;
        }
    },

    async create(docente) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Docentes (contrasena, nombre, correo, id_rol) VALUES (?, ?, ?, ?)',
                [docente.contrasena, docente.nombre, docente.correo, docente.id_rol]
            );
            return { id_docente: result.insertId, ...docente };
        } catch (err) {
            console.error('Error al crear docente:', err);
            throw err;
        }
    },

    async update(id, docente) {
        try {
            const [result] = await pool.query(
                'UPDATE Docentes SET ? WHERE id_docente = ?',
                [docente, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar docente:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Docentes WHERE id_docente = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar docente:', err);
            throw err;
        }
    }
};

module.exports = Docente;