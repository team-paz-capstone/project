package github.paz.awardportal.controller;

import github.paz.awardportal.model.AwardType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping(value = "/api/award-type")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class AwardTypeController {

    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve AWARDS from a service layer.
    private static final List<AwardType> AWARD_TYPES = Arrays.asList(
            new AwardType(1, "President’s Circle"),
            new AwardType(2, "Chairman’s Award"),
            new AwardType(3, "President’s Award")
    );

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<List<AwardType>> getAllAwards() {
        return ResponseEntity.ok(AWARD_TYPES);
    }

}
