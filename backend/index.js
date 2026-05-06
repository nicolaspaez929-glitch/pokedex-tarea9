const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const mongoose = require('mongoose');
const config = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Conexiones
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

mongoose.connect(config.mongoUri)
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.error('❌ Error Mongo:', err));

// Esquema de Mongo (Asegúrate que coincida con tus 10 pokémons)
const pokemonSchema = new mongoose.Schema({
    nombre: String,
    altura: String,
    peso: String,
    imagenFrontal: String,
    imagenPosterior: String
}, { collection: 'pokedex' });

const PokemonMongo = mongoose.model('Pokemon', pokemonSchema);

// RUTA PRINCIPAL
app.get('/pokemon/:nombre', async (req, res) => {
    const { nombre } = req.params;
    const { fuente } = req.query; // Aquí recibimos 'mongo' o 'supabase'

    try {
        if (fuente === 'mongo') {
            const poke = await PokemonMongo.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });
            if (!poke) return res.status(404).json({ error: "No encontrado en MongoDB" });
            return res.json({ ...poke._doc, fuente: "MongoDB Atlas" });
        } 
        
        // Por defecto o si es supabase
        const { data, error } = await supabase
            .from('pokemones')
            .select('*')
            .ilike('nombre', nombre)
            .single();

        if (error || !data) return res.status(404).json({ error: "No encontrado en Supabase" });
        res.json({ ...data, fuente: "Supabase (SQL)" });

    } catch (err) {
        res.status(500).json({ error: "Error de servidor", detalle: err.message });
    }
});

app.listen(3000, () => {
    console.log('🚀 Servidor en http://localhost:3000');
});
