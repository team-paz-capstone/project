package github.paz.awardportal.controller;

import github.paz.awardportal.model.Award;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping(value = "/api/award")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class AwardController {

    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve AWARDS from a service layer.
    private static final List<Award> AWARDS = Arrays.asList(
            new Award(),
            new Award(),
            new Award()
    );

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<List<Award>> getAllAwards() {
        return ResponseEntity.ok(AWARDS);
    }

}
