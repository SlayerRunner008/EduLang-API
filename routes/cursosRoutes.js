const express = require('express');
const router = express.Router();
const Curso = require('../models/cursos');

router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.getAll();
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const curso = await Curso.getById(req.params.id);
        if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
        res.json(curso);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin } = req.body;

        if (!id_asignatura || !cupo || activo === undefined || !horario || !idioma || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevoCurso = await Curso.create(req.body);
        res.status(201).json(nuevoCurso);
    } catch (err) {
        console.error('Error al crear curso:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id_asignatura, cupo, activo, horario, idioma, fecha_inicio, fecha_fin } = req.body;

        if (!id_asignatura || !cupo || activo === undefined || !horario || !idioma || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const actualizado = await Curso.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Curso no encontrado" });
        res.status(200).json({ message: "Curso actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Curso.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Curso no encontrado" });
        res.status(200).json({ message: "Curso eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;