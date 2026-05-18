package com.mashle;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mashle")
public class Personaje {

    @Id
    private String id;
    private String nombre;
    private String altura;
    private String peso;
    private String habilidad;
    private String ataque_principal;
    private String imagen;

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getAltura() { return altura; }
    public void setAltura(String altura) { this.altura = altura; }

    public String getPeso() { return peso; }
    public void setPeso(String peso) { this.peso = peso; }

    public String getHabilidad() { return habilidad; }
    public void setHabilidad(String habilidad) { this.habilidad = habilidad; }

    public String getAtaque_principal() { return ataque_principal; }
    public void setAtaque_principal(String ataque_principal) { this.ataque_principal = ataque_principal; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
}