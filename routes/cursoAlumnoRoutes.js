const express = require('express');
const router = express.Router();
const CursoAlumno = require('../models/cursoAlumno');

router.get('/', async (req, res) => {
    try {
        const cursoAlumnos = await CursoAlumno.getAll();
        res.json(cursoAlumnos);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cursoAlumno = await CursoAlumno.getById(req.params.id);
        if (!cursoAlumno) return res.status(404).json({ message: "Registro no encontrado" });
        res.json(cursoAlumno);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { calificacion, id_curso, matricula } = req.body;

        if (!id_curso || !matricula) {
            return res.status(400).json({ error: "Los campos id_curso y matrícula son obligatorios" });
        }

        const nuevoRegistro = await CursoAlumno.create({ calificacion, id_curso, matricula });
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        console.error('Error al crear registro en CursoAlumno:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { calificacion, id_curso, matricula } = req.body;

        if (!id_curso || !matricula) {
            return res.status(400).json({ error: "Los campos id_curso y matrícula son obligatorios" });
        }

        const actualizado = await CursoAlumno.update(req.params.id, { calificacion, id_curso, matricula });
        if (!actualizado) return res.status(404).json({ message: "Registro no encontrado" });
        res.status(200).json({ message: "Registro actualizado" });
    } catch (err) {
        console.error('Error al actualizar registro en CursoAlumno:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await CursoAlumno.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Registro no encontrado" });
        res.status(200).json({ message: "Registro eliminado" });
    } catch (err) {
        console.error('Error al eliminar registro en CursoAlumno:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;