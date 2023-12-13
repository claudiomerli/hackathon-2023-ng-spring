package com.entando.example.springms.service.impl;

import com.entando.example.springms.domain.Form;
import com.entando.example.springms.service.FormService;
import com.entando.example.springms.service.StatisticsService;
import com.entando.example.springms.service.dto.StatisticsDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final FormService formService;

    public StatisticsServiceImpl(FormService formService) {
        this.formService = formService;
    }
    @Override
    @Transactional(readOnly = true)
    public List<StatisticsDTO> getStatistics() {
        return formService.findAll().stream().map(this::toDTO).toList();
    }

    private StatisticsDTO toDTO(Form form) {
        return new StatisticsDTO(form.getId(), form.getName(), form.getAnswerCount());
    }
}
