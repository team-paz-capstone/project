package github.paz.awardportal.model.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BaseUser {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private byte[] signature;

    @JsonProperty
    private boolean isAdmin;

    public BaseUser() {
    } // necessary for tests

}
