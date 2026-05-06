-- Creamos la base de datos
CREATE DATABASE pokedex_db;

USE pokedex_db;

-- Creamos la tabla pokemon con sus respectivos campos
CREATE TABLE pokemon (
    -- ID autoincrementable como llave primaria
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Nombre del pokemon (único)
    nombre VARCHAR(50) NOT NULL UNIQUE,
    -- Altura en formato texto (ej. "0.4m")
    altura VARCHAR(20),
    -- Primer poder del pokemon
    poder_1 VARCHAR(50),
    -- Segundo poder del pokemon
    poder_2 VARCHAR(50),
    -- URL de la imagen frontal
    imagen_frontal VARCHAR(255),
    -- URL de la imagen posterior
    imagen_posterior VARCHAR(255)
);

INSERT INTO pokemon (nombre, altura, poder_1, poder_2, imagen_frontal, imagen_posterior) 
VALUES 
('Mew', '0.4m', 'Sincronía', 'Súper Psíquico', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png'),
('Rayquaza Shiny', '7.0m', 'Bucle Aire', 'Ascenso Draco', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/384.png'),
('Typhlosion Hisui', '1.6m', 'Mar Llamas', 'Marcha Espectral', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10233.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10233.png'),
('Lucario', '1.2m', 'Foco Interno', 'Esfera Aural', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/448.png'),
('Pichu', '0.3m', 'Electricidad Estática', 'Pararrayos', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/172.png'),
('Lugia', '5.2m', 'Presión', 'Aerochorro', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/249.png'),
('Giratina', '4.5m', 'Presión', 'Golpe Umbrío', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/487.png'),
('Articuno', '1.7m', 'Presión', 'Rayo Hielo', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/144.png'),
('Mega Gengar', '1.4m', 'Sombra Trampa', 'Bola Sombra', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94-mega.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94-mega.png'),
('Reshiram', '3.2m', 'Turbollama', 'Llama Azul', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/643.png');

USE pokedex_db;

SET SQL_SAFE_UPDATES = 0;

UPDATE pokemon 
SET nombre = 'Elfar' -- Aquí pones el nombre que quieras
WHERE nombre = 'Gengar';         -- Aquí pones el nombre que tiene actualmente

SET SQL_SAFE_UPDATES = 1;

