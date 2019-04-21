package github.paz.awardportal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class User {

    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isAdmin;
}
