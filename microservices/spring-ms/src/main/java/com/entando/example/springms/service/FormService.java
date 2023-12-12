package com.entando.example.springms.service;

import com.entando.example.springms.domain.Form;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface FormService {
    /**
     * Save a form.
     *
     * @param form the entity to save.
     * @return the persisted entity.
     */
    Form save(Form form);

    /**
     * Updates a form.
     *
     * @param formDTO the entity to update.
     * @return the persisted entity.
     */
    Form update(Form formDTO);

    /**
     * Get all the forms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Form> findAll(Pageable pageable);

    /**
     * Get the "id" form.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Form> findOne(String id);

    /**
     * Delete the "id" form.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
