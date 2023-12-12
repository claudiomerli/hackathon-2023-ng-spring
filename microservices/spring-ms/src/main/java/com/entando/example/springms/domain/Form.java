package com.entando.example.springms.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UuidGenerator;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Form {
    @UuidGenerator
    @Id
    private String id;
    private String name;
    @Column(columnDefinition = "text")
    private String structure;

    @Formula("(select count(*) from form_answer fa where fa.form_id = id)")
    private Integer answerCount;

}
