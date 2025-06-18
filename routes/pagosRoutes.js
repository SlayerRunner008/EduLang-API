const express = require('express');
const router = express.Router();
const Pago = require('../models/pagos');

router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.getAll();
        res.json(pagos);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pago = await Pago.getById(req.params.id);
        if (!pago) return res.status(404).json({ message: "Pago no encontrado" });
        res.json(pago);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { total, concepto, detalle, matricula } = req.body;

        if (!total || !concepto || !matricula) {
            return res.status(400).json({ error: "Los campos total, concepto y matrícula son obligatorios" });
        }

        const nuevoPago = await Pago.create(req.body);
        res.status(201).json(nuevoPago);
    } catch (err) {
        console.error('Error al crear pago:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { total, concepto, detalle, matricula } = req.body;

        if (!total || !concepto || !matricula) {
            return res.status(400).json({ error: "Los campos total, concepto y matrícula son obligatorios" });
        }

        const actualizado = await Pago.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Pago no encontrado" });
        res.status(200).json({ message: "Pago actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Pago.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Pago no encontrado" });
        res.status(200).json({ message: "Pago eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;