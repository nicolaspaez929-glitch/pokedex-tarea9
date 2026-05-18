import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flasgger import Swagger

# Cargamos las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Evitamos que Python transforme las tildes en códigos Unicode
app.json.ensure_ascii = False

# Habilitamos CORS para evitar bloqueos en el frontend
CORS(app)

# Configuración de Swagger
app.config['SWAGGER'] = {
    'title': 'Black Clover API',
    'uiversion': 3
}
swagger = Swagger(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

@app.route('/personaje/<nombre>', methods=['GET'])
def obtener_mago(nombre):
    """
    Obtener personaje de Black Clover
    ---
    parameters:
      - name: nombre
        in: path
        type: string
        required: true
        description: Nombre del personaje
        example: Asta
    responses:
      200:
        description: Personaje encontrado
        schema:
          properties:
            nombre:
              type: string
            altura:
              type: string
            peso:
              type: string
            habilidad:
              type: string
            ataque_principal:
              type: string
            escuadron:
              type: string
            imagen:
              type: string
            fuente:
              type: string
      404:
        description: Personaje no encontrado
    """
    url = f"{SUPABASE_URL}/rest/v1/black_clover?nombre=ilike.{nombre}"
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    try:
        respuesta_api = requests.get(url, headers=headers)
        
        if respuesta_api.status_code != 200:
            return jsonify({"error": "Error al comunicarse con Supabase"}), respuesta_api.status_code
        
        datos = respuesta_api.json()
        
        if not datos:
            return jsonify({"error": f"El mago '{nombre}' no se encuentra registrado."}), 404
        
        mago = datos[0]
        
        respuesta_frontend = {
            "id": mago.get("id"),
            "nombre": mago.get("nombre"),
            "altura": mago.get("altura"),
            "peso": mago.get("peso"),
            "habilidad": mago.get("habilidad"),
            "ataque_principal": mago.get("ataque_principal"),
            "escuadron": mago.get("escuadron"),
            "imagen": mago.get("imagen"),
            "fuente": "PostgreSQL (Supabase Cloud via REST API)"
        }
        
        return jsonify(respuesta_frontend), 200
    except Exception as e:
        print(f"Error en el servidor Flask: {e}")
        return jsonify({"error": "Error interno del servidor."}), 500

if __name__ == '__main__':
    puerto = int(os.getenv("PORT", 5001))
    app.run(host='0.0.0.0', port=puerto, debug=True)
