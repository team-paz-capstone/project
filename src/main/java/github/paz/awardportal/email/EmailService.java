package github.paz.awardportal.email;

import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.User.User;
import lombok.extern.log4j.Log4j2;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

@Component
@Log4j2
public class EmailService {
    private final String SUBJECT_LINE_TEMPLATE = "You have been awarded %s!";

    @Value("${award.certificate.name:award_certificate}")
    private String certificateName;

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
        String toAddress = award.getRecipient().getEmail();
        String emailBodyText = formatEmailTemplate(award);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setSubject(formatSubjectLine(award));
        helper.setTo(toAddress);
        helper.setText(emailBodyText);

        // Attach the PDF certificate.
        helper.addAttachment(certificateName + ".pdf", new ByteArrayResource(pdf));

        log.info("Sending email to " + toAddress);
        javaMailSender.send(message);
    }

    private String formatSubjectLine(Award award) {
        return String.format(SUBJECT_LINE_TEMPLATE, award.getAwardType().getName());
    }

    private String formatEmailTemplate(Award award) {
        String text = emailTemplate.getText();
        String toName = getNameForTemplate(award.getRecipient());
        String fromName = getNameForTemplate(award.getGranter());
        String awardName = award.getAwardType().getName();

        return String.format(text, toName, fromName, awardName);
    }

    private String getNameForTemplate(User user) {

        return user.getFirstName() + " " + user.getLastName();
    }

    /**
     * Send a recovery email to the user.
     *
     * @param email - User's Email
     * @param token - Token generated for recovery, should not be displayed
     *              for the user, but it required to reset the password.
     */
    public void sendAccountRecoveryEmail(
            String email,
            String token
    ) throws MessagingException, MalformedURLException, URISyntaxException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        String url = getRecoveryURL(email, token);
        String htmlMsg = getEmailContent(url);

        message.setContent(htmlMsg, "text/html");

        helper.setSubject("Account Recovery");
        helper.setTo(email);

        javaMailSender.send(message);
    }

    private String getEmailContent(String url) {
        return "<h3>Account Recovery</h3>" +
                "<br>" +
                "<a href=" + url + ">Click here to reset your password!</a>";

    }

    private String getRecoveryURL(String email, String token)
            throws URISyntaxException, MalformedURLException {
        URIBuilder builder = new URIBuilder();
        builder.setScheme("https");
        builder.setHost("pazcapstone.herokuapp.com");
        builder.setPath("/home/password-reset");
        builder.addParameter("email", email);
        builder.addParameter("token", token);
        return builder.build().toURL().toString();
    }
}
