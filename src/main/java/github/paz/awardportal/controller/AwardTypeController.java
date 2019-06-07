package github.paz.awardportal.controller;

import github.paz.awardportal.model.AwardType.AwardType;
import github.paz.awardportal.repository.AwardTypeRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(value = "/api/award-type")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
@Log4j2
public class AwardTypeController {

    @Autowired
    private AwardTypeRepository awardTypeRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<List<AwardType>> getAllAwards() {

        return ResponseEntity.ok(awardTypeRepository.findAll());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be created.")
    })
    public ResponseEntity<String> createAwardType(
            @RequestBody AwardType newAwardType) {
        log.info("Creating award type: " + newAwardType.getName());
        awardTypeRepository.save(newAwardType);

        return ResponseEntity.accepted().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved AwardType with given ID."),
            @ApiResponse(code = 404, message = "The AwardType with the given ID could not be found.")
    })
    public ResponseEntity<AwardType> getAwardType(@PathVariable Long id) {

        return awardTypeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ApiOperation(value = "Delete an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully deleted AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be deleted.")
    })
    public ResponseEntity<AwardType> deleteAwardType(
            @PathVariable("id") Long id) {

        log.info("Received Request to delete award-type: " + id);
        awardTypeRepository.deleteById(id);

        return ResponseEntity.accepted().build();
    }
}
