package com.mashle;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Obtener personaje de Mashle", description = "Busca un personaje por nombre en MongoDB Atlas")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personaje encontrado"),
        @ApiResponse(responseCode = "404", description = "Personaje no encontrado")
    })
    @GetMapping("/personaje/{nombre}")
    public ResponseEntity<Map<String, Object>> obtenerPersonaje(
        @Parameter(description = "Nombre del personaje", example = "Mash Burnedead")
        @PathVariable String nombre) {

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
