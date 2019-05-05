package github.paz.awardportal.model.Award;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class AwardSkeleton extends BaseAwardCreator {
    private int id;
    private Date timestamp;

    public AwardSkeleton(
            int id,
            Integer recipientID,
            Integer granterID,
            Integer awardTypeID,
            Date timestamp) {
        super(recipientID, granterID, awardTypeID);
        this.id = id;
        this.timestamp = timestamp;
    }
}
