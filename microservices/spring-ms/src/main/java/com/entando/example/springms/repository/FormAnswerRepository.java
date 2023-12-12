package com.entando.example.springms.repository;

import com.entando.example.springms.domain.FormAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormAnswerRepository extends JpaRepository<FormAnswer, String> {
}
