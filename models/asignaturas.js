const pool = require('../config/database');

const Asignatura = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Asignaturas');
            return rows;
        } catch (err) {
            console.error('Error al obtener todas las asignaturas:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Asignaturas WHERE id_asignatura = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener asignatura por ID:', err);
            throw err;
        }
    },

    async create(asignatura) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Asignaturas (nombre) VALUES (?)',
                [asignatura.nombre]
            );
            return { id_asignatura: result.insertId, ...asignatura };
        } catch (err) {
            console.error('Error al crear asignatura:', err);
            throw err;
        }
    },

    async update(id, asignatura) {
        try {
            const [result] = await pool.query(
                'UPDATE Asignaturas SET nombre = ? WHERE id_asignatura = ?',
                [asignatura.nombre, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar asignatura:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Asignaturas WHERE id_asignatura = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar asignatura:', err);
            throw err;
        }
    }
};

module.exports = Asignatura;