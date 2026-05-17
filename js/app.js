// ===== DATOS DE PERSONAJES POR ANIME =====
// Lista de personajes para cada anime
const personajes = {
    // Personajes de Pokémon (MySQL)
    pokemon: [
        "mew", "rayquaza shiny", "typhlosion hisui", "lucario",
        "pichu", "lugia", "giratina", "articuno", "mega gengar", "eevee"
    ],
    // Personajes de Black Clover (Supabase PostgreSQL)
    blackclover: [
        "Asta", "Yuno", "Noelle Silva", "Magna Swing", "Luck Voltia",
        "Finral Roulacase", "Vanessa Enoteca", "Gauche Adlai",
        "Gordon Agrippa", "Charmy Pappitson", "Yami Sukehiro", "Nacht Faust"
    ],
    // Personajes de Mashle (MongoDB)
    mashle: [
        "Mash Burnedead", "Finn Ames", "Lance Crown", "Dot Barrett",
        "Lemon Irvine", "Abel Walker", "Rayne Ames", "Cell War",
        "Innocent Zero", "Wahlberg Baigan"
    ]
};

// URLs de los backends por anime
const backends = {
    pokemon: "https://pokedex-tarea9.onrender.com/pokemon",
    blackclover: "https://blackclover-backend.onrender.com/personaje",
    mashle: "https://mashle-backend.onrender.com/personaje"
};

// Fuentes de cada anime
const fuentes = {
    pokemon: "mysql",
    blackclover: "supabase",
    mashle: "mongo"
};

// Variable para guardar el anime seleccionado
let animeActual = null;

// ===== FUNCIÓN SELECCIONAR ANIME =====
function seleccionarAnime(anime) {
    // Guardamos el anime seleccionado
    animeActual = anime;

    // Removemos clases activas de todos los botones
    document.querySelectorAll('.btn-anime').forEach(btn => {
        btn.classList.remove('active-pokemon', 'active-blackclover', 'active-mashle');
    });

    // Removemos temas del body
    document.body.classList.remove('tema-pokemon', 'tema-blackclover', 'tema-mashle');

    // Aplicamos tema y botón activo según el anime
    document.getElementById('btn' + capitalizar(anime)).classList.add('active-' + anime);
    document.body.classList.add('tema-' + anime);

    // Cambiamos el título según el anime
    const titulos = {
        pokemon: '⚡ BUSCAR POKÉMON',
        blackclover: '⚔️ BUSCAR BLACK CLOVER',
        mashle: '👊 BUSCAR MASHLE'
    };
    document.getElementById('mainTitle').innerText = titulos[anime];

    // Llenamos el dropdown con los personajes del anime
    const select = document.getElementById('personajeSelect');
    select.innerHTML = '<option value="">-- Selecciona un personaje --</option>';
    personajes[anime].forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.innerText = p;
        select.appendChild(option);
    });

    // Mostramos la caja de búsqueda
    document.getElementById('searchBox').style.display = 'block';

    // Ocultamos el resultado anterior
    document.getElementById('result').style.display = 'none';
}

// ===== FUNCIÓN CAPITALIZAR =====
function capitalizar(anime) {
    const map = {
        pokemon: 'Pokemon',
        blackclover: 'BlackClover',
        mashle: 'Mashle'
    };
    return map[anime];
}

// ===== FUNCIÓN BUSCAR =====
async function buscar() {
    // Verificamos que haya un anime y personaje seleccionado
    const nombre = document.getElementById('personajeSelect').value;
    if (!nombre) return alert("Selecciona un personaje");
    if (!animeActual) return alert("Selecciona un anime primero");

    try {
        // Construimos la URL del backend según el anime
        const url = `${backends[animeActual]}/${encodeURIComponent(nombre)}?fuente=${fuentes[animeActual]}`;

        // Hacemos la petición al backend
        const resp = await fetch(url);
        const data = await resp.json();

        // Si hay error lo mostramos
        if (data.error) {
            alert(data.error);
            return;
        }

        // Mostramos el nombre del personaje
        document.getElementById('displayName').innerText = data.nombre.toUpperCase();

        // Mostramos peso y altura
        document.getElementById('displayWeight').innerText = data.peso || '---';
        document.getElementById('displayHeight').innerText = data.altura || '---';

        // Mostramos habilidad
        document.getElementById('displayHabilidad').innerText = data.habilidad || '---';

        // Mostramos ataque principal
        document.getElementById('displayAtaque').innerText = data.ataque_principal || '---';

        // Mostramos escuadrón solo para Black Clover
        const escuadronGrid = document.getElementById('escuadronGrid');
        if (animeActual === 'blackclover' && data.escuadron) {
            // Mostramos el campo escuadrón
            document.getElementById('displayEscuadron').innerText = data.escuadron;
            escuadronGrid.style.display = 'flex';
        } else {
            // Ocultamos el campo escuadrón
            escuadronGrid.style.display = 'none';
        }

        // Mostramos la fuente de la base de datos
        document.getElementById('displaySource').innerText = data.fuente || '---';

        // Mostramos la imagen del personaje
        const imgPersonaje = document.getElementById('imgPersonaje');
        if (animeActual === 'pokemon') {
            // Pokémon tiene imagen frontal y posterior
            imgPersonaje.src = data.imagen_frontal || '';
            document.getElementById('imgFront').src = data.imagen_frontal || '';
            document.getElementById('imgBack').src = data.imagen_posterior || '';
            // Mostramos botón de imagen posterior
            document.getElementById('btnImagen').style.display = 'block';
        } else {
            // Black Clover y Mashle tienen una sola imagen
            imgPersonaje.src = data.imagen || '';
            // Ocultamos botón de imagen posterior
            document.getElementById('btnImagen').style.display = 'none';
        }

        // Mostramos el resultado
        document.getElementById('result').style.display = 'block';

    } catch (e) {
        alert("Error al conectar con el servidor");
        console.error(e);
    }
}

// ===== FUNCIONES DEL MODAL =====
// Abre el modal con las imágenes de Pokémon
function abrirModal() {
    document.getElementById('modalImagen').style.display = 'block';
}

// Cierra el modal
function cerrarModal() {
    document.getElementById('modalImagen').style.display = 'none';
}
