package com.entando.example.springms.controller;

import com.entando.example.springms.domain.Form;
import com.entando.example.springms.repository.FormRepository;
import com.entando.example.springms.service.FormService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FormController {
    private final Logger log = LoggerFactory.getLogger(FormController.class);
    private final FormService formService;
    private final FormRepository formRepository;

    public FormController(FormService formService, FormRepository formRepository) {
        this.formService = formService;
        this.formRepository = formRepository;
    }

    /**
     * {@code POST  /forms} : Create a new form.
     *
     * @param form the formDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formDTO, or with status {@code 400 (Bad Request)} if the form has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/forms-structure")
    public ResponseEntity<Form> createForm(@RequestBody Form form) throws Exception {
        log.debug("REST request to save Form : {}", form);
        if (form.getId() != null) {
            throw new Exception("A new form cannot already have an ID");
        }
        Form result = formService.save(form);
        return ResponseEntity
                .created(new URI("/api/forms-structure/" + result.getId()))
                .body(result);
    }

    @PutMapping("/forms-structure/{id}")
    public ResponseEntity<Form> updateForm(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody Form form
    ) throws Exception {
        log.debug("REST request to update Form : {}, {}", id, form);
        if (form.getId() == null) {
            throw new Exception("Invalid id");
        }
        if (!Objects.equals(id, form.getId())) {
            throw new Exception("Invalid ID");
        }

        if (!formRepository.existsById(id)) {
            throw new Exception("Entity not found");
        }

        Form result = formService.update(form);
        return ResponseEntity
                .ok()
                .body(result);
    }

    @GetMapping("/forms-structure")
    public ResponseEntity<List<Form>> getAllForms(Pageable pageable) {
        log.debug("REST request to get a page of Forms");
        Page<Form> page = formService.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @DeleteMapping("/forms-structure/{id}")
    public ResponseEntity<Void> deleteForm(@PathVariable String id) {
        log.debug("REST request to delete Form : {}", id);
        formService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
