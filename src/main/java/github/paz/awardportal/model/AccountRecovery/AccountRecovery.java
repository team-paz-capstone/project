package github.paz.awardportal.model.AccountRecovery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@Getter
@Setter
public class AccountRecovery {
    int id;
    String email;
    String token;
    private Date timestamp;
}
