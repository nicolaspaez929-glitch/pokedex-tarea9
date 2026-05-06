// Importamos el módulo 'mysql2/promise' que nos permite usar async/await con MySQL
//const mysql = require('mysql2/promise');

// Creamos una función asíncrona encargada de establecer y retornar la conexión
//async function conectarDB() {
   // try {
        // Usamos await para esperar a que createConnection termine de enlazarse
     //   const conexion = await mysql.createConnection({
       //     host: 'localhost',      // Servidor local
        //    user: 'root',           // Usuario por defecto de Workbench
          //  password: '1234', // <--- CLAVE DE WORKBENCH
            //database: 'pokedex_db'  // El nombre que pusimos en el Paso 1
       // });
        
        //console.log('¡Conexión a MySQL establecida!');
        //return conexion;
        
    //} catch (error) {
      //  console.error('Error crítico al conectar con MySQL:', error);
    //}
//}

// Exportamos la función para que el servidor pueda usarla
//module.exports = conectarDB;

// NUEVO PROCESO PARA LA NUBE

// NUEVO PROCESO PARA LA NUBE
// Configuración para conectar con la nube
// Configuración para conectar con la nube
const config = {
    // URL del proyecto (extraída de image_2ae140.png)
    supabaseUrl: "https://mcysifhwpcqdbnhxvljo.supabase.co", 
    
    // Tu nueva Publishable Key (extraída de image_2add99.png)
    // NOTA: Asegúrate de copiarla completa desde tu panel de Supabase
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeXNpZmh3cGNxZGJuaHh2bGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MjgyMDcsImV4cCI6MjA5MzQwNDIwN30.U3Hpfstr3uNRCioQPEjDry74fgPQXlSRApBA991ZuwU", 
    
    // Tu URI de MongoDB Atlas
    mongoUri: "mongodb+srv://nicolaspaez929_db_user:BVUrh0WRAj762hnL@pokemongo.f65pksm.mongodb.net/?appName=PokeMongo"
};

module.exports = config;