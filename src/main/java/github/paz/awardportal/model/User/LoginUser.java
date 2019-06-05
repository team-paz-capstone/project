package github.paz.awardportal.model.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginUser {

    private String email;
    private String password;

    public LoginUser() {
    } // necessary for tests

}
