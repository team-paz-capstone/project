package github.paz.awardportal.model.AccountRecovery;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "account_recovery")
@Getter
@Setter
@RequiredArgsConstructor
public class AccountRecovery {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "token")
    @NonNull
    private String token;

    @Column(name = "expiration", updatable = false)
    private LocalDateTime timestamp;
}
