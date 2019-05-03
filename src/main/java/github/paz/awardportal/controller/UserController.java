package github.paz.awardportal.controller;

import github.paz.awardportal.model.BaseUser;
import github.paz.awardportal.model.User;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.util.Arrays;
import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@RestController()
@RequestMapping(value = "/api/user")
@Api(value = "User Management System", description = "Operations pertaining to User in User Management System.")
public class UserController {

    @Autowired
    private BasicDataSource dataSource;


    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve USERS from a service layer.
    private static final List<User> USERS = Arrays.asList(
            new User(1, "Matthew", "Anderson", "anderma8@oregonstate.edu", "", true),
            new User(2, "Patrick", "Rice", "ricep@oregonstate.edu", "", true),
            new User(3, "Zi", "Wu", "wuzi@oregonstate.edu", "", true)
    );

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available USERS", response = List.class)
    public ResponseEntity<?> getAllUsers() {
        System.out.println("Get - All Users");

        try {
            Connection connection = dataSource.getConnection();
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            List<User> users = create.select().from("USERS").fetchInto(User.class);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up users");
        }
    }

    // Returns User with the given ID, or 404 NOT FOUND.
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an User with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved User with given ID."),
            @ApiResponse(code = 404, message = "The User with the given ID could not be found.")
    })
    public ResponseEntity<?> getUser(@PathVariable int id) {
        try {
            Connection connection = dataSource.getConnection();
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            User user = create.select().from("USERS").where("id=" + id).fetchAny().into(User.class);
            return ResponseEntity.ok(user);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to look up users");
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an User with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created user."),
            @ApiResponse(code = 500, message = "Failed to create the user. Try again later.")
    })
    public ResponseEntity<?> createUser(
            @RequestBody BaseUser newUser) {

        System.out.println("Received Request to created user: " + newUser);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String hashedPassword = passwordEncoder.encode(newUser.getPassword());
        System.out.println(hashedPassword.length());
        try {
            Connection connection = dataSource.getConnection();
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.insertInto(
                    table("users"),
                    field("first_name"),
                    field("last_name"),
                    field("email"),
                    field("password")
            ).values(
                    newUser.getFirstName(),
                    newUser.getLastName(),
                    newUser.getEmail(),
                    hashedPassword)
                    .returning(field("id"))
                    .fetch();

            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body("User with that email already exists!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ApiOperation(value = "Update an User with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated user."),
            @ApiResponse(code = 500, message = "Failed to update the user. Try again later.")
    })
    public ResponseEntity<String> updateUser(
            @RequestBody User user) {

        System.out.println("Received Request to update user: "
                + user.getFirstName() + " "
                + user.getLastName() + " "
                + user.getEmail());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        System.out.println(hashedPassword.length());
        try {
            Connection connection = dataSource.getConnection();
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.update(
                    table("users"))
                    .set(field("first_name"), user.getFirstName())
                    .set(field("last_name"), user.getLastName())
                    .set(field("email"), user.getEmail())
                    .set(field("password"), hashedPassword)
                    .where("id=" + user.getId())
                    .returning()
                    .fetch();

            return ResponseEntity.accepted().build();
        } catch (DataAccessException e) {
            e.printStackTrace();
            /*
             * TODO: This error handler is just taking a guess. I don't know how to interpret
             *  the different reasons.
             * */
            return ResponseEntity.badRequest().body("User with that email already exists!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Delete an User with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully deleted user."),
            @ApiResponse(code = 500, message = "Failed to deleted the user. Try again later.")
    })
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {

        System.out.println("Received Request to delete user: " + id);
        // TODO: Delete the user

        return ResponseEntity.ok("User Deleted!");
    }
}
