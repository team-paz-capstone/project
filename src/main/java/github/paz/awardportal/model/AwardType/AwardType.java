package github.paz.awardportal.model.AwardType;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "award_type")
@Getter
@Setter
@RequiredArgsConstructor
public class AwardType {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    @NonNull
    private String name;

    // JPA
    private AwardType() {}

}
