const pool = require('../config/database');

const Alumno = {
    async login(correo) {
        try {
            const [rows] = await pool.query("SELECT * FROM Alumnos WHERE correo = ?", [correo]);
            return rows;
        } catch (err) {
            console.error('Error en login:', err);
            throw err;
        }
    },

    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Alumnos');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los alumnos:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Alumnos WHERE matricula = ?', [id]);
            return rows;
        } catch (err) {
            console.error('Error al obtener alumno por ID:', err);
            throw err;
        }
    },

    async create(alumno) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Alumnos (contrasena, nombre, correo, fecha_ingreso, id_rol) VALUES (?, ?, ?, ?, ?)',
                [alumno.contrasena, alumno.nombre, alumno.correo, alumno.fecha_ingreso, alumno.id_rol]
            );
            return { matricula: result.insertId, ...alumno };
        } catch (err) {
            console.error('Error al crear alumno:', err);
            throw err;
        }
    },

    async update(id, alumno) {
        try {
            const [result] = await pool.query('UPDATE Alumnos SET ? WHERE matricula = ?', [alumno, id]);
            return result;
        } catch (err) {
            console.error('Error al actualizar alumno:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM Alumnos WHERE matricula = ?', [id]);
            return result;
        } catch (err) {
            console.error('Error al eliminar alumno:', err);
            throw err;
        }
    }
};

module.exports = Alumno;
