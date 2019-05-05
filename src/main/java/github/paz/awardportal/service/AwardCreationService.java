package github.paz.awardportal.service;

import github.paz.awardportal.dao.AwardDao;
import github.paz.awardportal.email.EmailService;
import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Award.BaseAwardCreator;
import github.paz.awardportal.pdf.AwardPdfGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AwardCreationService {

    // Toggle if an email should be sent when an award is granted.
    @Value("${award.send.email}")
    private boolean sendEmailOnAwardCreation;

    @Autowired
    private AwardDao awardDao;

    @Autowired
    private AwardPdfGenerator pdfGenerator;

    @Autowired
    private EmailService emailService;

    public void createAward(BaseAwardCreator creator) throws Exception {
        int createdAwardId = awardDao.createAward(creator);

        if(sendEmailOnAwardCreation) {
            Award justCreatedAward = awardDao.getAwardById(createdAwardId);
            byte[] pdf = pdfGenerator.generateAwardPdf(justCreatedAward);
            emailService.sendAwardCertificate(justCreatedAward, pdf);
        }
    }
}
