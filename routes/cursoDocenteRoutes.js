const express = require('express');
const router = express.Router();
const CursoDocente = require('../models/CursoDocente');

router.get('/', async (req, res) => {
    try {
        const cursoDocente = await CursoDocente.getAll();
        res.json(cursoDocente);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cursoDocente = await CursoDocente.getById(req.params.id);
        if (!cursoDocente) return res.status(404).json({ message: "Registro no encontrado" });
        res.json(cursoDocente);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id_curso, id_docente, id_disponibilidad } = req.body;

        if (!id_curso || !id_docente || !id_disponibilidad) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevoRegistro = await CursoDocente.create(req.body);
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        console.error('Error al crear registro en CursoDocente:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id_curso, id_docente, id_disponibilidad } = req.body;

        if (!id_curso || !id_docente || !id_disponibilidad) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const actualizado = await CursoDocente.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Registro no encontrado" });
        res.status(200).json({ message: "Registro actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await CursoDocente.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Registro no encontrado" });
        res.status(200).json({ message: "Registro eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;