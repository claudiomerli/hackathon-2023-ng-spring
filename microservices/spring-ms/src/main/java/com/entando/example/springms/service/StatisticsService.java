package com.entando.example.springms.service;

import com.entando.example.springms.service.dto.StatisticsDTO;

import java.util.List;

public interface StatisticsService {
    List<StatisticsDTO> getStatistics();
}
