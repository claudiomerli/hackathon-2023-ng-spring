package com.entando.example.springms.controller;

import com.entando.example.springms.service.StatisticsService;
import com.entando.example.springms.service.dto.StatisticsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class StatisticsController {
    private final Logger log = LoggerFactory.getLogger(StatisticsController.class);
    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticsDTO>> getFormStatistics() {
        log.debug("REST request to get statistics of Forms");
        List<StatisticsDTO> statistics = statisticsService.getStatistics();
        return ResponseEntity.ok().body(statistics);
    }
}
