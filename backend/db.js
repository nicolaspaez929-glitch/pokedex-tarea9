// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// Exportamos la configuración usando variables de entorno
module.exports = {
    // Configuración de MySQL en la nube (FreeSQLDatabase)
    mysql: {
        host: process.env.MYSQL_HOST,       // Host del servidor MySQL
        user: process.env.MYSQL_USER,       // Usuario de la base de datos
        password: process.env.MYSQL_PASSWORD, // Contraseña
        database: process.env.MYSQL_DATABASE, // Nombre de la base de datos
        port: parseInt(process.env.MYSQL_PORT) // Puerto 3306
    },
    // URI de conexión a MongoDB Atlas
    mongoUri: process.env.MONGO_URI
};
