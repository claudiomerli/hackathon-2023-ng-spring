package com.entando.example.springms.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FormAnswer {
    @Id
    @UuidGenerator
    private String id;
    @Column(columnDefinition = "text")
    private String structure;
    @Column(columnDefinition = "text")
    private String structureForm;

    @ManyToOne
    private Form form;
}
