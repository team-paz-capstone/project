package github.paz.awardportal.controller;

import github.paz.awardportal.model.Award.AwardSkeleton;
import github.paz.awardportal.model.Award.BaseAwardCreator;
import github.paz.awardportal.service.AwardCreationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SQLDialect;
import org.jooq.exception.DataAccessException;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@RestController()
@RequestMapping(value = "/api/award")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
@Log4j2
public class AwardController {

    @Autowired
    private BasicDataSource dataSource;

    @Autowired
    private AwardCreationService awardCreationService;

    private String tableName = "award";
    private String recipientID = "recipient_id";
    private String granterID = "granter_id";
    private String awardTypeID = "award_type_id";
    private String awardedDatetime = "awarded_datetime";

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<?> getAllAwards() {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            List<AwardSkeleton> skeletons = create.select()
                    .from(tableName)
                    .fetchInto(AwardSkeleton.class);
            return ResponseEntity.ok(skeletons);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up awards");
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created Award"),
            @ApiResponse(code = 404, message = "The Award could not be created.")
    })
    public ResponseEntity<String> createAward(
            @RequestBody BaseAwardCreator newAward) {
        log.info("Creating award: " + newAward);

        try {
            awardCreationService.createAward(newAward);
            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body(
                    "Error Creating type!\n"
                            + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAward(@PathVariable int id) {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            AwardSkeleton skeleton = create
                    .select()
                    .from(tableName)
                    .where("id=" + id)
                    .fetchAny()
                    .into(AwardSkeleton.class);
            return ResponseEntity.ok(skeleton);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up award");
        }
    }

    @RequestMapping(value = "/recipient/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByRecipient(@PathVariable int id) {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            AwardSkeleton skeleton = create
                    .select()
                    .from(tableName)
                    .where("recipient_id=" + id)
                    .fetchAny()
                    .into(AwardSkeleton.class);
            return ResponseEntity.ok(skeleton);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up awards");
        }
    }

    @RequestMapping(value = "/granter/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByGranter(@PathVariable int id) {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            AwardSkeleton skeleton = create
                    .select()
                    .from(tableName)
                    .where("granter_id=" + id)
                    .fetchAny()
                    .into(AwardSkeleton.class);
            return ResponseEntity.ok(skeleton);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up awards");
        }
    }

    @RequestMapping(value = "/award-type/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardByAwardType(@PathVariable int id) {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            AwardSkeleton skeleton = create
                    .select()
                    .from(tableName)
                    .where("award_type_id=" + id)
                    .fetchAny()
                    .into(AwardSkeleton.class);
            return ResponseEntity.ok(skeleton);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up awards");
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ApiOperation(value = "Update an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<String> updateAward(
            @RequestBody AwardSkeleton updated) {
        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            Record userRecord = create.update(
                    table(tableName))
                    .set(field(recipientID), updated.getRecipientID())
                    .set(field(granterID), updated.getGranterID())
                    .set(field(awardTypeID), updated.getAwardTypeID())
                    .where("id=" + updated.getId())
                    .returning(field("id"))
                    .fetchOne();
            System.out.println(userRecord.getValue(field("id")));

            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body(
                    "Error updating award!\n"
                            + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update");
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ApiOperation(value = "Delete an award with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully delete Award with given ID."),
            @ApiResponse(code = 404, message = "The Award with the given ID could not be found.")
    })
    public ResponseEntity<String> deleteAward(
            @PathVariable int id) {
        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.delete(table(tableName)).where("id=" + id).execute();
            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body("Failed to delete:\n" + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to delete");
        }    }

}
