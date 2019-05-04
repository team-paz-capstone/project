package github.paz.awardportal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@Getter
@Setter
public class Award{

    private int id;
    private User recipient;
    private User granter;
    private AwardType awardType;
    private Date timestamp;

}
