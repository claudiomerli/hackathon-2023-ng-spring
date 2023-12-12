package com.entando.example.springms.controller;

import com.entando.example.springms.domain.FormAnswer;
import com.entando.example.springms.repository.FormAnswerRepository;
import com.entando.example.springms.service.FormAnswerService;
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
public class FormAnswerController {
    private final Logger log = LoggerFactory.getLogger(FormAnswerController.class);

    private final FormAnswerService formAnswerService;

    private final FormAnswerRepository formAnswerRepository;

    public FormAnswerController(FormAnswerService formAnswerService, FormAnswerRepository formAnswerRepository) {
        this.formAnswerService = formAnswerService;
        this.formAnswerRepository = formAnswerRepository;
    }

    @PostMapping("/forms-answers")
    public ResponseEntity<Object> createFormAnswer(@RequestBody FormAnswer formAnswer) throws URISyntaxException {
        log.debug("REST request to save FormAnswer : {}", formAnswer);
        if (formAnswer.getId() != null) {
            JSONObject error = new JSONObject("{'error': 'A new formAnswer cannot already have an ID'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        FormAnswer result = formAnswerService.save(formAnswer);
        return ResponseEntity
                .created(new URI("/api/forms-answers/" + result.getId()))
                .body(result);
    }

    @GetMapping("/forms-answers")
    public ResponseEntity<List<FormAnswer>> getAllFormAnswers(Pageable pageable) {
        log.debug("REST request to get a page of FormAnswers");
        Page<FormAnswer> page = formAnswerService.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping("/forms-answers/{id}")
    public ResponseEntity<Object> getForm(@PathVariable String id) {
        log.debug("REST request to get FormAnswer : {}", id);
        if (!formAnswerRepository.existsById(id)) {
            JSONObject error = new JSONObject("{'error': 'Form answer not found'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        Optional<FormAnswer> formAnswer = formAnswerService.findOne(id);
        return ResponseEntity
                .ok()
                .body(formAnswer.orElse(null));
    }

    @DeleteMapping("/forms-answers/{id}")
    public ResponseEntity<Object> deleteFormAnswer(@PathVariable String id) {
        log.debug("REST request to delete FormAnswer : {}", id);
        if (!formAnswerRepository.existsById(id)) {
            JSONObject error = new JSONObject("{'error': 'Form answer not found'}");
            return new ResponseEntity<>(error.toMap(), HttpStatus.BAD_REQUEST);
        }
        formAnswerService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
