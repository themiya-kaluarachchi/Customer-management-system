package com.customer.management.util;

import com.customer.management.entity.Customer;
import org.apache.poi.ss.usermodel.*;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelHelper {

    public static List<Customer> excelToCustomer(InputStream is) {
        List<Customer> customers = new ArrayList<>();

        try {
            Workbook workbook = WorkbookFactory.create(is);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row == null || row.getRowNum() == 0) continue;

                Cell nameCell = row.getCell(0);
                Cell nicCell = row.getCell(1);
                Cell dobCell = row.getCell(2);


                if (nameCell == null || nicCell == null || dobCell == null) {
//                    System.out.println("Skipping row (null cell): " + row.getRowNum());
                    continue;
                }

                if (nameCell.getCellType() == CellType.BLANK ||
                        nicCell.getCellType() == CellType.BLANK ||
                        dobCell.getCellType() == CellType.BLANK) {
//                    System.out.println("Skipping row (blank cell): " + row.getRowNum());
                    continue;
                }

                Customer customer = new Customer();


                customer.setName(nameCell.toString());


                if (nicCell.getCellType() == CellType.NUMERIC) {
                    customer.setNic(String.valueOf((long) nicCell.getNumericCellValue()));
                } else {
                    customer.setNic(nicCell.toString());
                }


                if (dobCell.getCellType() == CellType.NUMERIC) {
                    customer.setDob(dobCell.getLocalDateTimeCellValue().toLocalDate());
                } else {
                    System.out.println("Skipping row (invalid date): " + row.getRowNum());
                    continue;
                }

                customers.add(customer);
            }

            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return customers;
    }
}
