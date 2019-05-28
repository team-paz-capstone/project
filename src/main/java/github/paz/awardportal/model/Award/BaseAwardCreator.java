package github.paz.awardportal.model.Award;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "award")
@Getter
@Setter
@AllArgsConstructor
public class BaseAwardCreator {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "recipient_id")
    @NonNull
    private Integer recipientID;

    @Column(name = "granter_id")
    @NonNull
    private Integer granterID;

    @Column(name = "award_type_id")
    @NonNull
    private Integer awardTypeID;


    // JPA
    private BaseAwardCreator() {}
}
