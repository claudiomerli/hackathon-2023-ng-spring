package com.entando.example.springms.service.impl;

import com.entando.example.springms.domain.Form;
import com.entando.example.springms.repository.FormRepository;
import com.entando.example.springms.service.FormService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FormServiceImpl implements FormService {
    private final Logger log = LoggerFactory.getLogger(FormServiceImpl.class);

    private final FormRepository formRepository;

    public FormServiceImpl(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    @Override
    public Form save(Form form) {
        log.debug("Request to save Form : {}", form);
        form = formRepository.save(form);
        return form;
    }

    @Override
    public Form update(Form form) {
        log.debug("Request to update Form : {}", form);
        form = formRepository.save(form);
        return form;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Form> findAll(Pageable pageable) {
        log.debug("Request to get all Forms");
        return formRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Form> findAll() {
        log.debug("Request to get all Forms");
        return formRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Form> findOne(String id) {
        log.debug("Request to get Form : {}", id);
        return formRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        Form form = findOne(id).orElseThrow();
        form.setDeleted(true);
        this.formRepository.save(form);
    }
}
