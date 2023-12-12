package com.entando.example.springms.controller;

import com.entando.example.springms.domain.FormAnswer;
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

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FormAnswerController {
    private final Logger log = LoggerFactory.getLogger(FormAnswerController.class);

    private final FormAnswerService formAnswerService;

    public FormAnswerController(FormAnswerService formAnswerService) {
        this.formAnswerService = formAnswerService;
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

    @DeleteMapping("/forms-answers/{id}")
    public ResponseEntity<Void> deleteFormAnswer(@PathVariable String id) {
        log.debug("REST request to delete FormAnswer : {}", id);
        formAnswerService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
