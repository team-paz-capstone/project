package github.paz.awardportal.controller;

import github.paz.awardportal.model.Office.Office;
import github.paz.awardportal.repository.OfficeRepository;
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
@RequestMapping(value = "/api/office")
@Api(value = "Office Management System", description = "Operations pertaining to Office in Office Management System.")
@Log4j2
public class OfficeController {

    @Autowired
    private OfficeRepository officeRepository;


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available OFFICES", response = List.class)
    public ResponseEntity<List<Office>> getAllOffices() {
        log.info("Get - All Offices");
        return ResponseEntity.ok(officeRepository.findAll());
    }

    // Returns Office with the given ID, or 404 NOT FOUND.
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an Office with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Office with given ID."),
            @ApiResponse(code = 404, message = "The Office with the given ID could not be found.")
    })
    public ResponseEntity<Office> getOffice(@PathVariable Long id) {
        return officeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an Office with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created office."),
            @ApiResponse(code = 500, message = "Failed to create the office. Try again later.")
    })
    public ResponseEntity<?> createOffice(@RequestBody Office office) {
        System.out.println("Received Request to created office: " + office);
        try {
            officeRepository.save(office);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ApiOperation(value = "Update an Office with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated office."),
            @ApiResponse(code = 500, message = "Failed to update the office. Try again later.")
    })
    public ResponseEntity<String> updateOffice(
            @RequestBody Office updatedOffice) {

        updatedOffice.toString();

        try {
            Optional result = officeRepository.findById(updatedOffice.getId());
            Office originalOffice = (Office) result.get();

            originalOffice.updateOffice(updatedOffice);

            officeRepository.save(originalOffice);

            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update");
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Delete an Office with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully deleted office."),
            @ApiResponse(code = 500, message = "Failed to deleted the office. Try again later.")
    })
    public ResponseEntity<String> deleteOffice(@PathVariable("id") long id) {

        System.out.println("Received Request to delete office: " + id);

        try {
            officeRepository.deleteById(id);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update");
        }
    }
}
