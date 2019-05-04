package github.paz.awardportal.model.Award;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BaseAwardCreator {
    private Integer recipientID;
    private Integer granterID;
    private Integer awardTypeID;
}
