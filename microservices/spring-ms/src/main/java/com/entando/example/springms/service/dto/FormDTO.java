package com.entando.example.springms.service.dto;

import com.entando.example.springms.domain.Form;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FormDTO {
    @NotEmpty(message = "Name is required.")
    private String name;
    @NotEmpty(message = "Structure is required.")
    private String structure;

    public Form toForm() {
        Form form = new Form();
        form.setName(this.name);
        form.setStructure(this.structure);
        return form;
    }
}
