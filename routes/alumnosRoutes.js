const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumnos');

router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: "Los campos están vacíos" });
    }

    try {
        const alumno = await Alumno.login(correo);
        if (!alumno || alumno.length === 0 || alumno[0].contrasena !== contrasena) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Respuesta estructurada para MAUI
        const response = {
            success: true,
            message: "Login exitoso",
            usuario: { //Este es el formato que espera MAUI
                id: alumno[0].id_alumno, 
                name: alumno[0].nombre,
                email: alumno[0].correo,
                rol: "alumno" 
            }
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
});


router.get('/', async (req, res) => {
    try {
        const alumnos = await Alumno.getAll();
        res.json(alumnos);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const alumno = await Alumno.getById(req.params.id);
        if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
        res.json(alumno);
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { contrasena, nombre, correo, fecha_ingreso, id_rol } = req.body;

        if (!contrasena || !nombre || !correo || !fecha_ingreso || !id_rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const nuevoAlumno = await Alumno.create(req.body);
        res.status(201).json(nuevoAlumno);
    } catch (err) {
        console.error('Error al crear alumno:', err);
        res.status(500).json({ error: "Error del servidor" });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Alumno.update(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ message: "Alumno no encontrado" });
        res.status(200).json({ message: "Alumno actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Alumno.delete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Alumno no encontrado" });
        res.status(200).json({ message: "Alumno eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;
