const pool = require('../config/database');

const CursoAlumno = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM CursoAlumno');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los registros de CursoAlumno:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM CursoAlumno WHERE id_curso_alumno = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener CursoAlumno por ID:', err);
            throw err;
        }
    },

    async create(cursoAlumno) {
        try {
            const { calificacion, id_curso, matricula } = cursoAlumno;

            const [result] = await pool.query(
                'INSERT INTO CursoAlumno (calificacion, id_curso, matricula) VALUES (?, ?, ?)',
                [calificacion, id_curso, matricula]
            );

            return { id_curso_alumno: result.insertId, ...cursoAlumno };
        } catch (err) {
            console.error('Error al crear registro en CursoAlumno:', err);
            throw err;
        }
    },

    async update(id, cursoAlumno) {
        try {
            const { calificacion, id_curso, matricula } = cursoAlumno;

            const [result] = await pool.query(
                'UPDATE CursoAlumno SET calificacion = ?, id_curso = ?, matricula = ? WHERE id_curso_alumno = ?',
                [calificacion, id_curso, matricula, id]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar registro en CursoAlumno:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM CursoAlumno WHERE id_curso_alumno = ?',
                [id]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar registro en CursoAlumno:', err);
            throw err;
        }
    }
};

module.exports = CursoAlumno;