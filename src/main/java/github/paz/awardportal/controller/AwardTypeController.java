package github.paz.awardportal.controller;

import github.paz.awardportal.model.AwardType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping(value = "/api/award-type")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class AwardTypeController {

    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve AWARD_TYPES from a service layer.
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

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be created.")
    })
    public ResponseEntity<String> createAwardType(
            @RequestHeader("name") String name) {
        return ResponseEntity.ok("AwardType Created!");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved AwardType with given ID."),
            @ApiResponse(code = 404, message = "The AwardType with the given ID could not be found.")
    })
    public ResponseEntity<AwardType> getAwardType(@PathVariable int id) {

        return AWARD_TYPES.stream()
                .filter(a -> a.getId() == id)
                .map(ResponseEntity::ok)
                .findFirst()
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ApiOperation(value = "Create an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be created.")
    })
    public ResponseEntity<String> deleteAwardType(
            @RequestHeader("id") String id) {
        return ResponseEntity.ok("AwardType deleted!");
    }

}
