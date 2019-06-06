package github.paz.awardportal.model.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Office.Office;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.Type;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Base64;
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

    @ManyToOne
    @JoinColumn(name = "office_id")
    private Office office;

    @Column(name = "is_admin")
    @NonNull
    private boolean isAdmin;

    @Column(name = "signature")
    @JsonIgnore
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] signature;

    @Column(name = "created_datetime", updatable = false)
    @CreationTimestamp
    private Timestamp timestamp;

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

    /**
     *  Do not update the password here.
     *  */
    public void updateUser(BaseUser update) {
        this.firstName = update.getFirstName();
        this.lastName = update.getLastName();
        this.email = update.getEmail();
        this.isAdmin = update.isAdmin();
        this.signature = update.getSignature();
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", office=" + office +
                ", isAdmin=" + isAdmin +
                ", timestamp=" + timestamp +
                ", receivedAwards=" + receivedAwards +
                '}';
    }

    // set signature from Multipartfile format which supports upload using <form>
    public void setSignature(MultipartFile file) {
        try {
            this.signature = file.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // return the signature in base64 string, allow it to be displayed in html
    public String getEncodedSignature() {
        String encodedSignature = "";
        // Users aren't required to have a signature (unless we make changes), so we need NPE protection here.
        // Otherwise, the Thymeleaf template throws a NPE when trying to create the image source string.
        if(signature != null) {
            encodedSignature = Base64.getEncoder().encodeToString(signature);
        }
        return encodedSignature;
    }
}
