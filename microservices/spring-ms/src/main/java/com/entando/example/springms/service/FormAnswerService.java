package com.entando.example.springms.service;

import com.entando.example.springms.domain.FormAnswer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface FormAnswerService {
    /**
     * Save a formAnswer.
     *
     * @param formAnswer the entity to save.
     * @return the persisted entity.
     */
    FormAnswer save(FormAnswer formAnswer);

    /**
     * Updates a formAnswer.
     *
     * @param formAnswer the entity to update.
     * @return the persisted entity.
     */
    FormAnswer update(FormAnswer formAnswer);

    /**
     * Get all the formAnswers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FormAnswer> findAll(Pageable pageable);

    Page<FormAnswer> findByFormId(String formId, Pageable pageable);

    /**
     * Get the "id" formAnswer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FormAnswer> findOne(String id);

    /**
     * Delete the "id" formAnswer.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
