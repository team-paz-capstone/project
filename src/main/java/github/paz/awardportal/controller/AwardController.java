package github.paz.awardportal.controller;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.model.AwardType;
import github.paz.awardportal.model.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping(value = "/api/award")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class AwardController {

    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve AWARDS from a service layer.
    private static final User genericUser = new User(1, "mr", "smith", "mrsmith@email.com", "password", false);
    private static final java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
    private static final AwardType genericAwardType = new AwardType(1, "Executive Choice");
    private static final List<Award> AWARDS = Arrays.asList(
            new Award(1, genericUser, genericUser, genericAwardType, date),
            new Award(2, genericUser, genericUser, genericAwardType, date),
            new Award(3, genericUser, genericUser, genericAwardType, date)
    );

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<List<Award>> getAllAwards() {
        return ResponseEntity.ok(AWARDS);
    }

}
