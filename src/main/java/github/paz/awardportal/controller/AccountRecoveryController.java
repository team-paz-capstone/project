package github.paz.awardportal.controller;

import github.paz.awardportal.email.EmailService;
import github.paz.awardportal.model.AccountRecovery.AccountRecovery;
import github.paz.awardportal.model.AccountRecovery.ChangedPassword;
import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.AccountRecoveryRepository;
import github.paz.awardportal.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import static org.apache.commons.text.CharacterPredicates.DIGITS;
import static org.apache.commons.text.CharacterPredicates.LETTERS;


@RestController()
@RequestMapping(value = "/api/account-recovery/")
@Api(value = "Award Management System", description = "Operations pertaining to Account Recovery in Award Management System.")
@Log4j2
public class AccountRecoveryController {

    @Autowired
    private AccountRecoveryRepository accountRecoveryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @RequestMapping(value = "/request", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> requestRecovery(
            @RequestBody String email
    ) {
        try {
            email = java.net.URLDecoder.decode(email, StandardCharsets.UTF_8.name());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        log.info("Requested recovery for email: " + email);
        RandomStringGenerator generator = new RandomStringGenerator.Builder()
                .withinRange('0', 'z')
                .filteredBy(LETTERS, DIGITS)
                .build();

        String token = generator.generate(60);
        log.info("Token generated: " + token);

        AccountRecovery accountRecovery = new AccountRecovery(email, token); // TODO - expiration logic?
        accountRecoveryRepository.save(accountRecovery);

        try {
            emailService.sendAccountRecoveryEmail(email, token);
        } catch (MessagingException mex) {
            log.warn("Failed to send recovery email to " + email, mex);
        }

        return ResponseEntity.accepted().build();
    }

    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> requestRecovery(
            @RequestBody ChangedPassword changedPassword
    ) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(
                changedPassword.getPassword());
        log.info(hashedPassword.length());

        User user = userRepository.findByEmail(changedPassword.getEmail());
        user.setPassword(hashedPassword);
        userRepository.save(user);

        return ResponseEntity.accepted().build();
    }
}
