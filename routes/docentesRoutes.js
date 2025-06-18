const express = require('express');
const router = express.Router();
const Docente = require('../models/docentes');

router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: "Los campos están vacíos" });
    }
    
    try {
        const docente = await Docente.login(correo);
        if (!docente || docente.length === 0 || docente[0].contrasena !== contrasena) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        
         // Respuesta estructurada para MAUI
        const response = {
            success: true,
            message: "Login exitoso",
            usuario: { //Este es el formato que espera MAUI
                id: docente[0].id_docente, 
                name: docente[0].nombre,
                email: docente[0].correo,
                rol: "docente" 
            }
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
});
router.get('/', async (req, res) => {
    try {
        const docentes = await Docente.getAll();
        res.json(docentes);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const docente = await Docente.getById(req.params.id);
        if (!docente) return res.status(404).json({ message: "Docente no encontrado" });
        res.json(docente);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { contrasena, nombre, correo, id_rol } = req.body;

        if (!contrasena || !nombre || !correo || !id_rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const nuevoDocente = await Docente.create(req.body);
        res.status(201).json(nuevoDocente);
    } catch (err) {
        console.error('Error al crear docente:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Docente.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Docente no encontrado" });
        res.status(200).json({ message: "Docente actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Docente.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Docente no encontrado" });
        res.status(200).json({ message: "Docente eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;