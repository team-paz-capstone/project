package github.paz.awardportal.controller;

import github.paz.awardportal.email.EmailService;
import github.paz.awardportal.model.AccountRecovery.ChangedPassword;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.commons.text.RandomStringGenerator;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.exception.DataAccessException;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;

import static org.apache.commons.text.CharacterPredicates.DIGITS;
import static org.apache.commons.text.CharacterPredicates.LETTERS;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;


@RestController()
@RequestMapping(value = "/api/account-recovery/")
@Api(value = "Award Management System", description = "Operations pertaining to Account Recovery in Award Management System.")
@Log4j2
public class AccountRecoveryController {

    @Autowired
    private BasicDataSource dataSource;

    @Autowired
    EmailService emailService;

    @RequestMapping(value = "/request", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> requestRecovery(
            @RequestBody String email
    ) {
        System.out.println("Requested recovery for email: " + email);
        RandomStringGenerator generator = new RandomStringGenerator.Builder()
                .withinRange('0', 'z')
                .filteredBy(LETTERS, DIGITS)
                .build();

        String token = generator.generate(60);
        System.out.println("Token generated: " + token);

        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.insertInto(
                    table("account_recovery"),
                    field("email"),
                    field("token"))
                    .values(
                            email,
                            token)
                    .returning(field("id"))
                    .fetch();
            emailService.sendAccountRecoveryEmail(email, token);
            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body(
                    "Failed to send recovery email!\n" + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> requestRecovery(
            @RequestBody ChangedPassword changedPassword
    ) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(
                changedPassword.getPassword());
        System.out.println(hashedPassword.length());

        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.update(
                    table("users"))
                    .set(field("password"), hashedPassword)
                    .where("email=" + changedPassword.getEmail())
                    .returning(field("id"))
                    .fetchOne();
            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body(
                    "Failed to change password\n" + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
