package com.entando.example.springms.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.Where;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@SQLRestriction("deleted is false")
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

    private Boolean deleted;
}
