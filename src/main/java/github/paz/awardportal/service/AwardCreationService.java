package github.paz.awardportal.service;

import github.paz.awardportal.email.EmailService;
import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.pdf.AwardPdfGenerator;
import github.paz.awardportal.pdf.exception.PdfGenerationException;
import github.paz.awardportal.repository.AwardRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
@Log4j2
public class AwardCreationService {

    // Toggle if an email should be sent when an award is granted.
    @Value("${award.send.email}")
    private boolean sendEmailOnAwardCreation;

    @Autowired
    private AwardRepository awardRepository;

    @Autowired
    private AwardPdfGenerator pdfGenerator;

    @Autowired
    private EmailService emailService;

    public void createAward(Award award){
        awardRepository.save(award);

        if(sendEmailOnAwardCreation) {
            try {
                byte[] pdf = pdfGenerator.generateAwardPdf(award);
                emailService.sendAwardCertificate(award, pdf);
            } catch (PdfGenerationException | MessagingException ex) {
                log.warn("Failed to send email", ex);
            }
        }
    }
}
