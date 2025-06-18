const pool = require('../config/database');

const CursoDocente = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM CursoDocente');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los registros de CursoDocente:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM CursoDocente WHERE id_curso_docente = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener CursoDocente por ID:', err);
            throw err;
        }
    },

    async create(cursoDocente) {
        try {
            const { id_curso, id_docente, id_disponibilidad } = cursoDocente;
            const [result] = await pool.query(
                'INSERT INTO CursoDocente (id_curso, id_docente, id_disponibilidad) VALUES (?, ?, ?)',
                [id_curso, id_docente, id_disponibilidad]
            );
            return { id_curso_docente: result.insertId, ...cursoDocente };
        } catch (err) {
            console.error('Error al crear registro en CursoDocente:', err);
            throw err;
        }
    },

    async update(id, cursoDocente) {
        try {
            const { id_curso, id_docente, id_disponibilidad } = cursoDocente;
            const [result] = await pool.query(
                'UPDATE CursoDocente SET id_curso = ?, id_docente = ?, id_disponibilidad = ? WHERE id_curso_docente = ?',
                [id_curso, id_docente, id_disponibilidad, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar registro en CursoDocente:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM CursoDocente WHERE id_curso_docente = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar registro en CursoDocente:', err);
            throw err;
        }
    }
};

module.exports = CursoDocente;