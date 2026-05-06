const btnSupabase = document.getElementById('btnSupabase');
const btnMongo = document.getElementById('btnMongo');
const btnImagen = document.getElementById('btnImagen');
const input = document.getElementById('pokemonName');
const resultDiv = document.getElementById('result');

async function buscar(fuente) {
    const nombre = input.value.trim().toLowerCase();
    if (!nombre) return alert("Escribe un nombre");

    try {
        // Hacemos la petición al backend enviando la fuente como query
        const resp = await fetch(`https://pokedex-tarea9.onrender.com/pokemon/${nombre}?fuente=${fuente}`);
        const data = await resp.json();

        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('displayName').innerText = data.nombre.toUpperCase();
            document.getElementById('displayWeight').innerText = data.peso;
            document.getElementById('displayHeight').innerText = data.altura;
            document.getElementById('displaySource').innerText = data.fuente;
            document.getElementById('displayHabilidad').innerText = data.habilidad || "---";
            document.getElementById('displayAtaque').innerText = data.ataque_principal || "---";
            
            document.getElementById('imgFront').src = data.imagen_frontal;
document.getElementById('imgBack').src = data.imagen_posterior;

            resultDiv.style.display = 'block';
        }
    } catch (e) {
        alert("Error: ¿Está encendido el servidor node?");
    }
}

btnSupabase.onclick = () => buscar('supabase');
btnMongo.onclick = () => buscar('mongo');

// Modal
const modal = document.getElementById("modalImagen");
btnImagen.onclick = () => modal.style.display = "block";
document.querySelector(".close").onclick = () => modal.style.display = "none";
