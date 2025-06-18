const express = require('express');
const router = express.Router();
const Asignatura = require('../models/asignaturas');

router.get('/', async (req, res) => {
    try {
        const asignaturas = await Asignatura.getAll();
        res.json(asignaturas);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const asignatura = await Asignatura.getById(req.params.id);
        if (!asignatura) return res.status(404).json({ message: "Asignatura no encontrada" });
        res.json(asignatura);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: "El campo nombre es obligatorio" });
        }

        const nuevaAsignatura = await Asignatura.create({ nombre });
        res.status(201).json(nuevaAsignatura);
    } catch (err) {
        console.error('Error al crear asignatura:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: "El campo nombre es obligatorio" });
        }

        const actualizado = await Asignatura.update(req.params.id, { nombre });
        if (!actualizado) return res.status(404).json({ message: "Asignatura no encontrada" });
        res.status(200).json({ message: "Asignatura actualizada" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Asignatura.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Asignatura no encontrada" });
        res.status(200).json({ message: "Asignatura eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;