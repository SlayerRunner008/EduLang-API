require('dotenv').config();
const  express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db= require('./config/database');

const app = express();

//midleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//rutas 
app.use('/alumnos', require('./routes/alumnosRoutes'));
app.use('/admins', require('./routes/adminsRoutes'));
app.use('/docentes', require('./routes/docentesRoutes'));
app.use('/cursos', require('./routes/cursosRoutes'));
app.use('/asignaturas', require('./routes/asignaturasRoutes'));
app.use('/pagos', require('./routes/pagosRoutes'));
app.use('/disponibilidad',require('./routes/disponibilidadRoutes'));
app.use('/cursoDocente',require('./routes/cursoDocenteRoutes'));
app.use('/cursoAlumno',require('./routes/cursoAlumnoRoutes'));
app.use('/roles',require('./routes/rolesRoutes'));

db.getConnection(err=>{
    if(err){
        console.error('Error conectando a la base de datos',err);
        return;
    }

    console.log('conectado a la base de datos MySQL');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`El servidor levantó en el puerto ${PORT}`);
})

app.get('/ping', (req, res) => {
    res.send('pong');
});
