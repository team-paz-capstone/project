package github.paz.awardportal.email;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.model.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
@Log4j2
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    SimpleMailMessage emailTemplate;

    // Only for testing.
    public void sendTestEmail(String toAddress) throws MessagingException {
        log.info("Attempting to send email to: " + toAddress);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setSubject("TEST PAZ CAPSTONE");
        helper.setTo(toAddress);
        String text = "This is the email body text. PDF will be attached.";
        helper.setText(text);

        javaMailSender.send(message);
    }

    // Real implementation.
    public void sendAwardCertificate(Award award, byte[] pdf) throws MessagingException {
        // populate the template.
        // create javaMailSender message.
        // attach PDF.
        // send message.
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setSubject("Congratulations! You have received an award!");
        helper.setTo(award.getRecipient().getEmail());
        String text = formatEmailTemplate(award);

        helper.setText(text);

        // TODO: Attach the PDF.

        javaMailSender.send(message);
    }

    private String formatEmailTemplate(Award award) {
        String text = emailTemplate.getText();
        String toName = getNameForTemplate(award.getRecipient());
        String fromName = getNameForTemplate(award.getGranter());

        return String.format(text, toName, fromName);
    }

    private String getNameForTemplate(User user) {
        return user.getFirstName() + " " + user.getLastName();
    }
}
