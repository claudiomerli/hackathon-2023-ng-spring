package com.entando.example.springms.controller;

import com.entando.example.springms.domain.Form;
import com.entando.example.springms.repository.FormRepository;
import com.entando.example.springms.service.FormService;
import com.entando.example.springms.service.dto.FormDTO;
import jakarta.validation.Valid;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
     * @param formDTO the formDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formDTO, or with status {@code 400 (Bad Request)} if the form has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/forms-structure")
    public ResponseEntity<Object> createForm(@Valid @RequestBody FormDTO formDTO) throws URISyntaxException {
        log.debug("REST request to save Form : {}", formDTO);
        Form result = formService.save(formDTO.toForm());
        return ResponseEntity
                .created(new URI("/api/forms-structure/" + result.getId()))
                .body(result);
    }

    @PutMapping("/forms-structure/{id}")
    public ResponseEntity<Object> updateForm(
            @PathVariable(value = "id", required = false) final String id,
            @Valid @RequestBody FormDTO formDTO
    ) {
        log.debug("REST request to update Form : {}, {}", id, formDTO);
        if (!formRepository.existsById(id)) {
            JSONObject error = new JSONObject("{'error': 'Form not found'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        Form form = formDTO.toForm();
        form.setId(id);
        form = formService.update(form);
        return ResponseEntity
                .ok()
                .body(form);
    }

    @GetMapping("/forms-structure")
    public ResponseEntity<List<Form>> getAllForms(Pageable pageable) {
        log.debug("REST request to get a page of Forms");
        Page<Form> page = formService.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping("/forms-structure/{id}")
    public ResponseEntity<Object> getForm(@PathVariable String id) {
        log.debug("REST request to get Form : {}", id);
        if (!formRepository.existsById(id)) {
            JSONObject error = new JSONObject("{'error': 'Form not found'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        Optional<Form> form = formService.findOne(id);
        return ResponseEntity
                .ok()
                .body(form.orElseThrow());
    }

    @DeleteMapping("/forms-structure/{id}")
    public ResponseEntity<Object> deleteForm(@PathVariable String id) {
        log.debug("REST request to delete Form : {}", id);
        if (!formRepository.existsById(id)) {
            JSONObject error = new JSONObject("{'error': 'Form not found'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        formService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
