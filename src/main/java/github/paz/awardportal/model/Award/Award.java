package github.paz.awardportal.model.Award;

import github.paz.awardportal.model.AwardType.AwardType;
import github.paz.awardportal.model.User.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "award")
@Getter
@Setter
@AllArgsConstructor
public class Award{

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "awarded_datetime", updatable = false)
    @CreationTimestamp  // TODO - make sure this actually inserts on creation.
    private LocalDateTime timestamp;

    @OneToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    @OneToOne
    @JoinColumn(name = "granter_id")
    private User granter;

    @OneToOne
    @JoinColumn(name = "award_type_id")
    private AwardType awardType;


    // JPA
    private Award() {}

}
