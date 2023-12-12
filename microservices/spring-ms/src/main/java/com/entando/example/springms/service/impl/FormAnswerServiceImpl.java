package com.entando.example.springms.service.impl;

import com.entando.example.springms.domain.FormAnswer;
import com.entando.example.springms.repository.FormAnswerRepository;
import com.entando.example.springms.repository.FormRepository;
import com.entando.example.springms.service.FormAnswerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class FormAnswerServiceImpl implements FormAnswerService {
    private final Logger log = LoggerFactory.getLogger(FormAnswerServiceImpl.class);

    private final FormAnswerRepository formAnswerRepository;
    private final FormRepository formRepository;

    public FormAnswerServiceImpl(FormAnswerRepository formAnswerRepository, FormRepository formRepository) {
        this.formAnswerRepository = formAnswerRepository;
        this.formRepository = formRepository;
    }

    @Override
    public FormAnswer save(FormAnswer formAnswer) {
        log.debug("Request to save FormAnswer : {}", formAnswer);
        formAnswer = formAnswerRepository.save(formAnswer);
        FormAnswer result = formAnswer;
        formRepository.findById(formAnswer.getForm().getId()).ifPresent(result::setForm);
        return result;
    }

    @Override
    public FormAnswer update(FormAnswer formAnswer) {
        log.debug("Request to update FormAnswer : {}", formAnswer);
        formAnswer = formAnswerRepository.save(formAnswer);
        FormAnswer result = formAnswer;
        formRepository.findById(formAnswer.getForm().getId()).ifPresent(result::setForm);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FormAnswer> findAll(Pageable pageable) {
        log.debug("Request to get all FormAnswers");
        return formAnswerRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FormAnswer> findOne(String id) {
        log.debug("Request to get FormAnswer : {}", id);
        return formAnswerRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete FormAnswer : {}", id);
        formAnswerRepository.deleteById(id);
    }
}
