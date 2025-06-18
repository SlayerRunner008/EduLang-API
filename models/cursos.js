const pool = require('../config/database');

const Curso = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Cursos');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los cursos:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Cursos WHERE id_curso = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener curso por ID:', err);
            throw err;
        }
    },

    async create(curso) {
        try {
            const { id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin } = curso;
            const [result] = await pool.query(
                'INSERT INTO Cursos (id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin]
            );
            return { id_curso: result.insertId, ...curso };
        } catch (err) {
            console.error('Error al crear curso:', err);
            throw err;
        }
    },

    async update(id, curso) {
        try {
            const { id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin } = curso;
            const [result] = await pool.query(
                'UPDATE Cursos SET id_asignatura = ?, cupo = ?, activo = ?, horario = ?, idioma = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_curso = ?',
                [id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar curso:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Cursos WHERE id_curso = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar curso:', err);
            throw err;
        }
    }
};

module.exports = Curso;