package com.entando.example.springms.service.dto;

import com.entando.example.springms.domain.Form;
import com.entando.example.springms.domain.FormAnswer;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FormAnswerDTO {
    @NotEmpty(message = "Structure is required.")
    private String structure;
    @NotEmpty(message = "Form Structure is required.")
    private String structureForm;
    @NotEmpty(message = "Form ID is required.")
    private String formId;

    public FormAnswer toFormAnswer() {
        FormAnswer formAnswer = new FormAnswer();
        formAnswer.setStructure(this.structure);
        formAnswer.setStructureForm(this.structureForm);
        Form form = new Form();
        form.setId(this.formId);
        formAnswer.setForm(form);
        return formAnswer;
    }
}
