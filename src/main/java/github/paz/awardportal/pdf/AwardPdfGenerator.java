package github.paz.awardportal.pdf;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.pdf.exception.PdfGenerationException;

public interface AwardPdfGenerator {
     byte[] generateAwardPdf(Award award) throws PdfGenerationException;

     // TODO - remove this once Awards have been implemented.
    byte[] generateAwardPdf(AwardPdfTemplateData data) throws PdfGenerationException;
}
