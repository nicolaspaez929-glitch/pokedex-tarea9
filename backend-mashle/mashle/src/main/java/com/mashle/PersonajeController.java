package com.mashle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class PersonajeController {

    @Autowired
    private PersonajeRepository repositorio;

    @GetMapping("/personaje/{nombre}")
    public ResponseEntity<Map<String, Object>> obtenerPersonaje(@PathVariable String nombre) {
        Optional<Personaje> resultado = repositorio.findByNombreIgnoreCase(nombre);
        
        if (!resultado.isPresent()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Personaje '" + nombre + "' no encontrado en MongoDB");
            return ResponseEntity.status(404).body(error);
        }

        Personaje p = resultado.get();
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("nombre", p.getNombre());
        respuesta.put("altura", p.getAltura());
        respuesta.put("peso", p.getPeso());
        respuesta.put("habilidad", p.getHabilidad());
        respuesta.put("ataque_principal", p.getAtaque_principal());
        respuesta.put("imagen", p.getImagen());
        respuesta.put("fuente", "MongoDB Atlas");

        return ResponseEntity.ok(respuesta);
    }
}