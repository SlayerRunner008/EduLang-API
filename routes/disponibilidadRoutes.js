const express = require('express');
const router = express.Router();
const Disponibilidad = require('../models/disponibilidad');

router.get('/', async (req, res) => {
    try {
        const disponibilidades = await Disponibilidad.getAll();
        res.json(disponibilidades);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.getById(req.params.id);
        if (!disponibilidad) return res.status(404).json({ message: "Disponibilidad no encontrada" });
        res.json(disponibilidad);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { hora_inicio, hora_fin, dia, id_docente } = req.body;

        if (!hora_inicio || !hora_fin || !dia || !id_docente) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevaDisponibilidad = await Disponibilidad.create(req.body);
        res.status(201).json(nuevaDisponibilidad);
    } catch (err) {
        console.error('Error al crear disponibilidad:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { hora_inicio, hora_fin, dia, id_docente } = req.body;

        if (!hora_inicio || !hora_fin || !dia || !id_docente) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const actualizado = await Disponibilidad.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Disponibilidad no encontrada" });
        res.status(200).json({ message: "Disponibilidad actualizada" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Disponibilidad.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Disponibilidad no encontrada" });
        res.status(200).json({ message: "Disponibilidad eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;