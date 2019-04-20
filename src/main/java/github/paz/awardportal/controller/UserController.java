package github.paz.awardportal.controller;

import github.paz.awardportal.model.user;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping(value = "/api/user")
@Api(value = "user Management System", description = "Operations pertaining to user in user Management System.")
public class UserController {

    // TODO - for demonstration purposes only. Real implementation
    //   will retrieve users from a service layer.
    private static final List<user> users = Arrays.asList(
            new user(1, "Matthew", "Anderson", "anderma8@oregonstate.edu"),
            new user(2, "Patrick", "Rice", "ricep@oregonstate.edu"),
            new user(3, "Zi", "Wu", "wuzi@oregonstate.edu")
    );


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available users", response = List.class)
    public ResponseEntity<List<user>> getAllUsers() {
        System.out.println("Get - All Users");
        return ResponseEntity.ok(users);
    }

    // Returns user with the given ID, or 404 NOT FOUND.
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an user with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved user with given ID."),
            @ApiResponse(code = 404, message = "The user with the given ID could not be found.")
    })
    public ResponseEntity<user> getEmployee(@PathVariable int id) {

        return users.stream()
                .filter(u -> u.getId() == id)
                .map(ResponseEntity::ok)
                .findFirst()
                .orElse(ResponseEntity.notFound().build());
    }
}
