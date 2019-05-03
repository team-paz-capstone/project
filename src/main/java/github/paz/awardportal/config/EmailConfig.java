package github.paz.awardportal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;

@Configuration
public class EmailConfig {

    @Bean
    public SimpleMailMessage awardEmailTemplate() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(
                "Congratulations, %s! %s has awarded you %s!"
        );
        return message;
    }
}
