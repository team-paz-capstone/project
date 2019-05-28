package github.paz.awardportal.controller;

import github.paz.awardportal.pdf.AwardPdfGenerator;
import github.paz.awardportal.pdf.AwardPdfTemplateData;
import github.paz.awardportal.pdf.exception.PdfGenerationException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@RestController
@Log4j2
public class PdfTestController {

    @Autowired
    private AwardPdfGenerator generator;

    @GetMapping(value = "/pdf/award")
    public ResponseEntity<byte[]> generateAwardPdf(
            @RequestParam(value = "recipient", defaultValue = "DEFAULT_RECIPIENT") String recipient,
            @RequestParam(value = "granter", defaultValue = "DEFAULT_GRANTER") String granter) {

        // Bypassing the Award API since that hasn't been implemented yet.
        AwardPdfTemplateData data = new AwardPdfTemplateData();
        data.setRecipientName(recipient);
        data.setGranterName(granter);
        SimpleDateFormat format = new SimpleDateFormat("dd MMM yyy");
        data.setDateAwarded(format.format(new Date()));
        data.setAwardName("Employee of the Month");

        try {
            byte[] pdf = generator.generateAwardPdf(data);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (PdfGenerationException pdfex) {
            log.warn("Error generating PDF!", pdfex);
            return new ResponseEntity<>(new byte[]{}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
