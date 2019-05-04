package github.paz.awardportal.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User extends BaseUser {
    private int id;

    public User(int id, String firstName, String lastName, String email, String password, boolean isAdmin) {
        super(firstName, lastName, email, password, isAdmin);
        this.id = id;
    }

    public User(){ // necessary for tests
        super();
    }
}
