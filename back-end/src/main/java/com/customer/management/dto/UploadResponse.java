package com.customer.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UploadResponse {
    private int totalRows;
    private int successCount;
    private int failureCount;
    private List<String> errors;
}
