// ===== DATOS DE PERSONAJES POR ANIME =====
const personajes = {
    pokemon: [
        "mew", "rayquaza shiny", "typhlosion hisui", "lucario",
        "pichu", "lugia", "giratina", "articuno", "mega gengar", "eevee"
    ],
    blackclover: [
        "Asta", "Yuno", "Noelle Silva", "Magna Swing", "Luck Voltia",
        "Finral Roulacase", "Vanessa Enoteca", "Gauche Adlai",
        "Gordon Agrippa", "Charmy Pappitson", "Yami Sukehiro", "Nacht Faust"
    ],
    mashle: [
        "Mash Burnedead", "Finn Ames", "Lance Crown", "Dot Barrett",
        "Lemon Irvine", "Abel Walker", "Rayne Ames", "Cell War",
        "Innocent Zero", "Wahlberg Baigan"
    ]
};

const backends = {
    pokemon: "https://pokedex-tarea9.onrender.com/pokemon",
    blackclover: "https://blackclover-backend.onrender.com/personaje",
    mashle: "https://mashle-backend.onrender.com/personaje"
};

const fuentes = {
    pokemon: "mysql",
    blackclover: "supabase",
    mashle: "mongo"
};

let animeActual = null;

function seleccionarAnime(anime) {
    animeActual = anime;
    document.querySelectorAll('.btn-anime').forEach(btn => {
        btn.classList.remove('active-pokemon', 'active-blackclover', 'active-mashle');
    });
    document.body.classList.remove('tema-pokemon', 'tema-blackclover', 'tema-mashle');
    document.getElementById('btn' + capitalizar(anime)).classList.add('active-' + anime);
    document.body.classList.add('tema-' + anime);

    const titulos = {
        pokemon: '⚡ BUSCAR POKÉMON',
        blackclover: '⚔️ BUSCAR BLACK CLOVER',
        mashle: '👊 BUSCAR MASHLE'
    };
    document.getElementById('mainTitle').innerText = titulos[anime];

    const select = document.getElementById('personajeSelect');
    select.innerHTML = '<option value="">-- Selecciona un personaje --</option>';
    personajes[anime].forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.innerText = p;
        select.appendChild(option);
    });

    document.getElementById('searchBox').style.display = 'block';
    document.getElementById('result').style.display = 'none';
}

function capitalizar(anime) {
    const map = {
        pokemon: 'Pokemon',
        blackclover: 'BlackClover',
        mashle: 'Mashle'
    };
    return map[anime];
}

async function buscar() {
    const nombre = document.getElementById('personajeSelect').value;
    if (!nombre) return alert("Selecciona un personaje");
    if (!animeActual) return alert("Selecciona un anime primero");

    try {
        const url = `${backends[animeActual]}/${encodeURIComponent(nombre)}?fuente=${fuentes[animeActual]}`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById('displayName').innerText = data.nombre.toUpperCase();
        document.getElementById('displayWeight').innerText = data.peso || '---';
        document.getElementById('displayHeight').innerText = data.altura || '---';
        document.getElementById('displayHabilidad').innerText = data.habilidad || '---';

        // ===== CONTROL DE DISEÑO INTELIGENTE PARA BLACK CLOVER =====
        const etiquetaAtaque = document.getElementById('displayAtaque').parentElement;
        
        if (animeActual === 'blackclover') {
            etiquetaAtaque.innerHTML = `<strong>Ataque / Escuadrón:</strong> <span id="displayAtaque"></span>`;
            const ataqueReal = data.ataque_principal || '---';
            const escuadronReal = data.escuadron || '---';
            document.getElementById('displayAtaque').innerText = `${ataqueReal} (${escuadronReal})`;
        } else {
            etiquetaAtaque.innerHTML = `<strong>Ataque Principal:</strong> <span id="displayAtaque"></span>`;
            document.getElementById('displayAtaque').innerText = data.ataque_principal || '---';
        }

        document.getElementById('displaySource').innerText = data.fuente || '---';

        const imgPersonaje = document.getElementById('imgPersonaje');
        if (animeActual === 'pokemon') {
            imgPersonaje.src = data.imagen_frontal || '';
            document.getElementById('imgFront').src = data.imagen_frontal || '';
            document.getElementById('imgBack').src = data.imagen_posterior || '';
            document.getElementById('btnImagen').style.display = 'block';
        } else {
            imgPersonaje.src = data.imagen || '';
            document.getElementById('btnImagen').style.display = 'none';
        }

        document.getElementById('result').style.display = 'block';

    } catch (e) {
        alert("Error al conectar con el servidor");
        console.error(e);
    }
}

function abrirModal() {
    document.getElementById('modalImagen').style.display = 'block';
}

// Cierra el modal
function cerrarModal() {
    document.getElementById('modalImagen').style.display = 'none';
}
