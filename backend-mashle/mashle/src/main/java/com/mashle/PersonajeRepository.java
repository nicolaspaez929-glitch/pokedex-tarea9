package com.mashle;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PersonajeRepository extends MongoRepository<Personaje, String> {
    Optional<Personaje> findByNombreIgnoreCase(String nombre);
}