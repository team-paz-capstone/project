package github.paz.awardportal.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


/*
Credentials a user submits when trying to log in.
 */
@Getter
@Setter
@AllArgsConstructor
public class AuthenticationCredentials {

    private String email;
    private String password;

    public AuthenticationCredentials(){}
}
