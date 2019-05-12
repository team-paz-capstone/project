package github.paz.awardportal.model.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import github.paz.awardportal.model.Award.Award;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@RequiredArgsConstructor
public class User {

    @Id
    @Basic(optional = false)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "first_name")
    @NonNull
    private String firstName;

    @Column(name = "last_name")
    @NonNull
    private String lastName;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "password")
    @NonNull
    @JsonIgnore
    private String password;

    @Column(name = "is_admin")
    @NonNull
    private boolean isAdmin;

    @Column(name = "signature")
    @JsonIgnore
    private byte[] signature;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipient") // TODO - cascade types.
    @JsonIgnore
    private List<Award> receivedAwards;


    // JPA. TODO - make private after JPA refactoring complete.
    public User(BaseUser baseUser) {
        this.firstName = baseUser.getFirstName();
        this.lastName = baseUser.getLastName();
        this.email = baseUser.getEmail();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(baseUser.getPassword());
        this.isAdmin = baseUser.isAdmin();
    }

    public void updateUser(BaseUser update){
        this.firstName = update.getFirstName();
        this.lastName = update.getLastName();
        this.email = update.getEmail();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(update.getPassword());
        this.isAdmin = update.isAdmin();
        this.signature = update.getSignature();
    }

    public User() {
    }
}
