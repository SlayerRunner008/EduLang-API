const pool = require('../config/database');

const Disponibilidad = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Disponibilidad');
            return rows;
        } catch (err) {
            console.error('Error al obtener todas las disponibilidades:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Disponibilidad WHERE id_disponibilidad = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener disponibilidad por ID:', err);
            throw err;
        }
    },

    async create(disponibilidad) {
        try {
            const { hora_inicio, hora_fin, dia, id_docente } = disponibilidad;
            const [result] = await pool.query(
                'INSERT INTO Disponibilidad (hora_inicio, hora_fin, dia, id_docente) VALUES (?, ?, ?, ?)',
                [hora_inicio, hora_fin, dia, id_docente]
            );
            return { id_disponibilidad: result.insertId, ...disponibilidad };
        } catch (err) {
            console.error('Error al crear disponibilidad:', err);
            throw err;
        }
    },

    async update(id, disponibilidad) {
        try {
            const { hora_inicio, hora_fin, dia, id_docente } = disponibilidad;
            const [result] = await pool.query(
                'UPDATE Disponibilidad SET hora_inicio = ?, hora_fin = ?, dia = ?, id_docente = ? WHERE id_disponibilidad = ?',
                [hora_inicio, hora_fin, dia, id_docente, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar disponibilidad:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Disponibilidad WHERE id_disponibilidad = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar disponibilidad:', err);
            throw err;
        }
    }
};

module.exports = Disponibilidad;