package com.entando.example.springms.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.hibernate.annotations.UuidGenerator;

public class FormAnswer {
    @UuidGenerator
    @Id
    private String id;
    private String name;
    @Column(columnDefinition = "text")
    private String structure;
    @Column(columnDefinition = "text")
    private String structureForm;

    @ManyToOne()
    private Form form;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getStructureForm() {
        return structureForm;
    }

    public void setStructureForm(String structureForm) {
        this.structureForm = structureForm;
    }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }
}
