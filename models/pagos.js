const pool = require('../config/database');

const Pago = {
    async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM Pagos');
            return rows;
        } catch (err) {
            console.error('Error al obtener todos los pagos:', err);
            throw err;
        }
    },

    async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Pagos WHERE id_pagos = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al obtener pago por ID:', err);
            throw err;
        }
    },

    async create(pago) {
        try {
            const { total, concepto, detalle, matricula } = pago;
            const [result] = await pool.query(
                'INSERT INTO Pagos (total, concepto, detalle, matricula) VALUES (?, ?, ?, ?)',
                [total, concepto, detalle, matricula]
            );
            return { id_pagos: result.insertId, ...pago };
        } catch (err) {
            console.error('Error al crear pago:', err);
            throw err;
        }
    },

    async update(id, pago) {
        try {
            const { total, concepto, detalle, matricula } = pago;
            const [result] = await pool.query(
                'UPDATE Pagos SET total = ?, concepto = ?, detalle = ?, matricula = ? WHERE id_pagos = ?',
                [total, concepto, detalle, matricula, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al actualizar pago:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM Pagos WHERE id_pagos = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar pago:', err);
            throw err;
        }
    }
};

module.exports = Pago;