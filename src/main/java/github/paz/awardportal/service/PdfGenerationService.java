package github.paz.awardportal.service;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.pdf.AwardPdfGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PdfGenerationService {
    @Autowired
    private AwardPdfGenerator generator;

    public byte[] generateAwardPdf(Award award) {
        return generator.generateAwardPdf(award);
    }
}
