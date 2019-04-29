package github.paz.awardportal.pdf;

import github.paz.awardportal.model.Award;

public interface AwardPdfGenerator {
     byte[] generateAwardPdf(Award award);
}
