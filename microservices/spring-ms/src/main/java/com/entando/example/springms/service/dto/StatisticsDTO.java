package com.entando.example.springms.service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class StatisticsDTO {
    private String id;
    private String name;
    private Integer count;
}
