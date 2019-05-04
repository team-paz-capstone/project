package github.paz.awardportal.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwardType extends BaseAwardType {

    private int id;

    public AwardType(int id, String name) {
        super(name);
        this.id = id;
    }
}
