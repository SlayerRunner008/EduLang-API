const express = require('express');
const router = express.Router();
const Rol = require('../models/roles');

router.get('/', async (req, res) => {
    try {
        const roles = await Rol.getAll();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rol = await Rol.getById(req.params.id);
        if (!rol) return res.status(404).json({ message: "Rol no encontrado" });
        res.json(rol);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: "El campo nombre es obligatorio" });
        }

        const nuevoRol = await Rol.create({ nombre, descripcion });
        res.status(201).json(nuevoRol);
    } catch (err) {
        console.error('Error al crear rol:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: "El campo nombre es obligatorio" });
        }

        const actualizado = await Rol.update(req.params.id, { nombre, descripcion });
        if (!actualizado) return res.status(404).json({ message: "Rol no encontrado" });
        res.status(200).json({ message: "Rol actualizado" });
    } catch (err) {
        console.error('Error al actualizar rol:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Rol.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Rol no encontrado" });
        res.status(200).json({ message: "Rol eliminado" });
    } catch (err) {
        console.error('Error al eliminar rol:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;