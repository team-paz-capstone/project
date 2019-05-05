package github.paz.awardportal.model.AccountRecovery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChangedPassword {
    String email;
    String token;
    String password;
}
