package com.trophy.Trophy.SoldTrophy;

import com.trophy.Trophy.Trophy;
import com.trophy.Trophy.TrophyRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/sold-trophies")
@CrossOrigin(origins = "http://localhost:3000")
//@PreAuthorize("hasRole('ADMIN')")
public class SoldTrophyController {

    @Autowired
    private SoldTrophyRepository soldTrophyRepo;

    @Autowired
    private TrophyRepository trophyRepo;

    @PostMapping("/{trophyCode}/sell")
    public ResponseEntity<?> sellTrophy(
            @PathVariable String trophyCode,
            @RequestParam String size,
            @RequestParam int quantity,
            @RequestParam double soldPrice,
            @RequestParam String soldDate) {

        // Optional: check if trophy exists and size exists
        Trophy trophy = trophyRepo.findByTrophyCode(trophyCode)
                .orElseThrow(() -> new RuntimeException("Trophy not found"));
        trophy.getSizes().stream()
                .filter(s -> s.getSize().equals(size))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Save sold record
        SoldTrophy sold = new SoldTrophy();
        sold.setTrophyCode(trophyCode);
        sold.setSize(size);
        sold.setSoldQuantity(quantity);
        sold.setSoldPrice(soldPrice);
        sold.setSoldDate(String.valueOf(LocalDate.parse(soldDate)));
        soldTrophyRepo.save(sold);

        return ResponseEntity.ok("Sold record saved");
    }

    @GetMapping
    public List<SoldTrophy> getAllSoldTrophies() {
        return soldTrophyRepo.findAll();
    }

    // Aggregated summary for all trophies
    @GetMapping("/summary")
    public ResponseEntity<List<TrophySalesSummary>> getAllSalesSummary() {
        return ResponseEntity.ok(soldTrophyRepo.getTotalSalesSummary());
    }

    // Aggregated summary for a single trophy code
    @GetMapping("/summary/{trophyCode}")
    public ResponseEntity<TrophySalesSummary> getSalesSummaryByTrophyCode(@PathVariable String trophyCode) {
        return ResponseEntity.ok(soldTrophyRepo.getTotalSalesSummaryByTrophyCode(trophyCode));
    }

    @GetMapping("/export-summary")
    public void exportSoldTrophiesSummary(
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate,
            HttpServletResponse response) throws IOException {

        // 1. Fetch all sold trophies
        List<SoldTrophy> soldList = soldTrophyRepo.findAll();

        // 2. Filter by date range if provided
        if (fromDate != null && toDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate from = LocalDate.parse(fromDate, formatter);
            LocalDate to = LocalDate.parse(toDate, formatter);

            soldList = soldList.stream()
                    .filter(s -> {
                        if (s.getSoldDate() == null) return false;
                        LocalDate sold = LocalDate.parse(s.getSoldDate(), formatter);
                        return !sold.isBefore(from) && !sold.isAfter(to);
                    })
                    .toList();

        }

        // 3. Group by trophyCode
        Map<String, List<SoldTrophy>> grouped = soldList.stream()
                .collect(Collectors.groupingBy(SoldTrophy::getTrophyCode));

        // 4. Prepare Excel workbook
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Summary");

        // Header row
        Row header = sheet.createRow(0);
        String[] columns = {"Trophy Code", "Total Quantity Sold", "Total Price (₹)"};
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        // Data rows
        int rowIdx = 1;
        for (String code : grouped.keySet()) {
            int totalQty = grouped.get(code).stream().mapToInt(SoldTrophy::getSoldQuantity).sum();
            double totalPrice = grouped.get(code).stream()
                    .mapToDouble(s -> s.getSoldQuantity() * s.getSoldPrice()).sum();

            Row excelRow = sheet.createRow(rowIdx++);
            excelRow.createCell(0).setCellValue(code);
            excelRow.createCell(1).setCellValue(totalQty);
            excelRow.createCell(2).setCellValue(totalPrice);
        }

        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // 5. Stream file
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=sold_trophies_summary.xlsx");

        workbook.write(response.getOutputStream());
        workbook.close();
    }



}
