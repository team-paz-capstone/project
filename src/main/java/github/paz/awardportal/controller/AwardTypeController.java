package github.paz.awardportal.controller;

import github.paz.awardportal.model.AwardType;
import github.paz.awardportal.model.BaseAwardType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
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
@RequestMapping(value = "/api/award-type")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class AwardTypeController {

    @Autowired
    private BasicDataSource dataSource;
    private String tableName = "award_type";

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available awards", response = List.class)
    public ResponseEntity<?> getAllAwards() {
        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            List<AwardType> awardTypes = create.select()
                    .from(tableName)
                    .fetchInto(AwardType.class);
            return ResponseEntity.ok(awardTypes);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up award types");
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be created.")
    })
    public ResponseEntity<String> createAwardType(
            @RequestBody BaseAwardType newAwardType) {
        System.out.println("Creating award type: " + newAwardType.getName());
        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.insertInto(
                    table(tableName),
                    field("name")
            ).values(newAwardType.getName())
                    .returning(field("id"))
                    .fetch();

            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body(
                    "Error Creating type!\n"
                            + e.getMessage());        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved AwardType with given ID."),
            @ApiResponse(code = 404, message = "The AwardType with the given ID could not be found.")
    })
    public ResponseEntity<?> getAwardType(@PathVariable int id) {

        try (Connection connection = dataSource.getConnection()){
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            AwardType awardType = create
                    .select()
                    .from(tableName)
                    .where("id=" + id)
                    .fetchAny()
                    .into(AwardType.class);
            return ResponseEntity.ok(awardType);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up award type");
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ApiOperation(value = "Create an AwardType with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created AwardType"),
            @ApiResponse(code = 404, message = "The AwardType could not be created.")
    })
    public ResponseEntity<?> deleteAwardType(
            @PathVariable("id") int id) {

        System.out.println("Received Request to delete award-type: " + id);

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
            return ResponseEntity.badRequest().body(
                    "Error deleting type! Check ID\n"
                            + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error deleting type!");
        }
    }

}
