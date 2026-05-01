package com.customer.management.util;

import com.customer.management.entity.Customer;
import lombok.var;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelExportHelper {

    private ExcelExportHelper() {}

    public static byte[] customersToExcel(List<Customer> customers) throws IOException {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Customers");

            // ── Header style
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.TEAL.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);

            // ── Date cell style
            CellStyle dateStyle = workbook.createCellStyle();
            CreationHelper creationHelper = workbook.getCreationHelper();
            dateStyle.setDataFormat(creationHelper.createDataFormat().getFormat("yyyy-mm-dd"));

            // ── Headers
            String[] headers = {
                    "ID", "Name", "NIC", "Date of Birth",
                    "Phone Numbers", "Address Line 1", "Address Line 2",
                    "City", "Country"
            };

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 18 * 256);
            }

            // ── Data rows
            CellStyle altStyle = workbook.createCellStyle();
            altStyle.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.getIndex());
            altStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            for (int i = 0; i < customers.size(); i++) {
                Customer c = customers.get(i);
                Row row = sheet.createRow(i + 1);

                // Alternating row colour
                if (i % 2 == 1) {
                    for (int col = 0; col < headers.length; col++) {
                        row.createCell(col).setCellStyle(altStyle);
                    }
                }

                row.createCell(0).setCellValue(c.getId() != null ? c.getId() : 0);
                row.createCell(1).setCellValue(safe(c.getName()));
                row.createCell(2).setCellValue(safe(c.getNic()));

                // DOB
                if (c.getDob() != null) {
                    Cell dobCell = row.createCell(3);
                    dobCell.setCellValue(c.getDob().toString());
                } else {
                    row.createCell(3).setCellValue("");
                }

                // Phones
                String phones = "";
                if (c.getPhones() != null && !c.getPhones().isEmpty()) {
                    phones = c.getPhones().stream()
                            .map(p -> p.getNumber() != null ? p.getNumber() : "")
                            .filter(n -> !n.trim().isEmpty())
                            .reduce((a, b) -> a + " | " + b)
                            .orElse("");
                }
                row.createCell(4).setCellValue(phones);

                // Address
                if (c.getAddresses() != null && !c.getAddresses().isEmpty()) {
                    var addr = c.getAddresses().get(0);
                    row.createCell(5).setCellValue(safe(addr.getLine1()));
                    row.createCell(6).setCellValue(safe(addr.getLine2()));
                    row.createCell(7).setCellValue(safe(addr.getCity()));
                    row.createCell(8).setCellValue(safe(addr.getCountry()));
                } else {
                    row.createCell(5).setCellValue("");
                    row.createCell(6).setCellValue("");
                    row.createCell(7).setCellValue("");
                    row.createCell(8).setCellValue("");
                }
            }

            // Auto-size first 4 columns
            for (int i = 0; i < 4; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }

    private static String safe(String value) {
        return value != null ? value : "";
    }
}