package github.paz.awardportal.controller;

import github.paz.awardportal.email.EmailService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class EmailTestController {

    @Autowired
    EmailService email;

    @GetMapping(value = "/api/email")
    public void sendEmail(@RequestParam(value = "toAddress") String toAddress) {
        try {
            email.sendTestEmail(toAddress);
        } catch (Exception ex) {
            log.warn("Exception sending email to " + toAddress, ex);
        }

    }

}
