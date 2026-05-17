// Importamos las dependencias necesarias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const config = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexión a MongoDB
mongoose.connect(config.mongoUri)
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.error('❌ Error Mongo:', err));

// Esquema de Mongoose para MongoDB
const pokemonSchema = new mongoose.Schema({
    nombre: String,
    altura: String,
    peso: String,
    imagen_frontal: String,
    imagen_posterior: String,
    habilidad: String,
    ataque_principal: String
}, { collection: 'pokedex' });

const PokemonMongo = mongoose.model('Pokemon', pokemonSchema);

// Ruta principal - consulta MySQL o MongoDB según fuente
app.get('/pokemon/:nombre', async (req, res) => {
    const { nombre } = req.params;
    const { fuente } = req.query;

    try {
        if (fuente === 'mongo') {
            // Consultamos MongoDB
            const poke = await PokemonMongo.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });
            if (!poke) return res.status(404).json({ error: "No encontrado en MongoDB" });
            return res.json({
                nombre: poke.nombre,
                altura: poke.altura,
                peso: poke.peso,
                imagen_frontal: poke.imagen_frontal,
                imagen_posterior: poke.imagen_posterior,
                habilidad: poke.habilidad,
                ataque_principal: poke.ataque_principal,
                fuente: "MongoDB Atlas"
            });
        }

        // Por defecto consultamos MySQL
        const connection = await mysql.createConnection(config.mysql);
        const [rows] = await connection.execute(
            'SELECT * FROM pokemones WHERE LOWER(nombre) = LOWER(?)',
            [nombre]
        );
        await connection.end();

        if (rows.length === 0) return res.status(404).json({ error: "No encontrado en MySQL" });
        res.json({ ...rows[0], fuente: "MySQL (FreeSQLDatabase)" });

    } catch (err) {
        res.status(500).json({ error: "Error de servidor", detalle: err.message });
    }
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('🚀 Servidor en http://localhost:3000');
});
