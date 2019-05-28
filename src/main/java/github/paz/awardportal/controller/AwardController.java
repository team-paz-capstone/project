package github.paz.awardportal.controller;

import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Award.BaseAwardCreator;
import github.paz.awardportal.repository.AwardRepository;
import github.paz.awardportal.repository.BaseAwardRepository;
import github.paz.awardportal.service.AwardCreationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping(value = "/api/award")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
@Log4j2
public class AwardController {

    @Autowired
    private AwardRepository awardRepository;

    @Autowired
    private BaseAwardRepository baseAwardRepository;

    @Autowired
    private AwardCreationService awardCreationService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<List<Award>> getAllAwards() {

        return ResponseEntity.ok(awardRepository.findAll());

    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created Award"),
            @ApiResponse(code = 404, message = "The Award could not be created.")
    })
    public ResponseEntity<String> createAward(
            @RequestBody BaseAwardCreator baseAwardCreator) {
        log.info("Creating award: " + baseAwardCreator);
        BaseAwardCreator newAward = baseAwardRepository.save(baseAwardCreator);
        Optional<Award> award = awardRepository.findById(newAward.getId());
        if (award.isPresent()) {
            awardCreationService.createAward(award.get());
            return ResponseEntity.accepted().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<Award> getAward(@PathVariable Long id) {
        return awardRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/recipient/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByRecipient(@PathVariable int id) {
        return awardRepository.findByRecipientId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/granter/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByGranter(@PathVariable int id) {
        return awardRepository.findByGranterId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/award-type/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByAwardType(@PathVariable int id) {
        return awardRepository.findByAwardTypeId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ApiOperation(value = "Delete an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully delete Award with given ID."),
            @ApiResponse(code = 500, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<String> deleteAward(
            @PathVariable long id) {
        awardRepository.deleteById(id);
        return ResponseEntity.accepted().build();
    }
}
