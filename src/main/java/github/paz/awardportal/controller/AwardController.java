package github.paz.awardportal.controller;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.model.AwardType;
import github.paz.awardportal.model.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created Award"),
            @ApiResponse(code = 404, message = "The Award could not be created.")
    })
    public ResponseEntity<String> createAward(
            @RequestHeader("recipientId") String recipientId,
            @RequestHeader("granterId") String granterId,
            @RequestHeader("awardTypeId") String awardTypeId) {
        return ResponseEntity.ok("Award Created!");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<Award> getAward(@PathVariable int id) {

        return AWARDS.stream()
                .filter(a -> a.getId() == id)
                .map(ResponseEntity::ok)
                .findFirst()
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ApiOperation(value = "Update an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<String> updateAward(
            @RequestBody Award updated) {
        return ResponseEntity.ok("Award Updated!");
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ApiOperation(value = "Delete an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully delete Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<String> deleteAward(
            @PathVariable int id) {
        return ResponseEntity.ok("Award Deleted!");
    }

}
