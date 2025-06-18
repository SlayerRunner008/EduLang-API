const express = require('express');
const router = express.Router();
const Administrador = require('../models/admins');
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: "Los campos están vacíos" });
    }
    
    try {
        const admin = await Administrador.login(correo);
        if (!admin || admin.length === 0 || admin[0].contrasena !== contrasena) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
       
         // Respuesta estructurada para MAUI
        const response = {
            success: true,
            message: "Login exitoso",
            usuario: { //Este es el formato que espera MAUI
                id: admin[0].id_administrador, 
                name: admin[0].nombre,
                email: admin[0].correo,
                rol: "administrador" 
            }
        };
        res.json(response);

    } catch (err) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
});


router.get('/', async (req, res) => {
    try {
        const admins = await Administrador.getAll();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const admin = await Administrador.getById(req.params.id);
        if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, correo, contrasena, id_rol } = req.body;

        if (!nombre || !correo || !contrasena || !id_rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const nuevoAdmin = await Administrador.create(req.body);
        res.status(201).json(nuevoAdmin);
    } catch (err) {
        console.error('Error al crear administrador:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Administrador.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Administrador no encontrado" });
        res.status(200).json({ message: "Administrador actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Administrador.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Administrador no encontrado" });
        res.status(200).json({ message: "Administrador eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;