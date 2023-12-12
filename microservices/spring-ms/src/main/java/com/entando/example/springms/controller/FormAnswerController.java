package com.entando.example.springms.controller;

import com.entando.example.springms.domain.FormAnswer;
import com.entando.example.springms.repository.FormAnswerRepository;
import com.entando.example.springms.service.FormAnswerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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
    public ResponseEntity<FormAnswer> createFormAnswer(@RequestBody FormAnswer formAnswer) throws Exception {
        log.debug("REST request to save FormAnswer : {}", formAnswer);
        if (formAnswer.getId() != null) {
            throw new Exception("A new formAnswer cannot already have an ID");
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
