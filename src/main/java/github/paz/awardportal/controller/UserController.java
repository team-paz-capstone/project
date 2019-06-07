package github.paz.awardportal.controller;

import github.paz.awardportal.model.User.BaseUser;
import github.paz.awardportal.model.User.LoginUser;
import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController()
@RequestMapping(value = "/api/user")
@Api(value = "User Management System", description = "Operations pertaining to User in User Management System.")
@Log4j2
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ApiOperation(value = "View list of all available USERS", response = List.class)
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("Get - All Users");
        return ResponseEntity.ok(userRepository.findAll());
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ApiOperation(value = "Checks the email and password", response = List.class)
    public ResponseEntity<?> logIn(
            @RequestBody LoginUser login
    ) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        log.info("Login: " + login.getEmail());
        User response = userRepository.findByEmail(login.getEmail());
        if (response != null && passwordEncoder.matches(login.getPassword(), response.getPassword())){
            return  ResponseEntity.ok(response);
        }
        return  ResponseEntity.badRequest().build();
    }

    // Returns User with the given ID, or 404 NOT FOUND.
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "View an User with the given ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved User with given ID."),
            @ApiResponse(code = 404, message = "The User with the given ID could not be found.")
    })
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ApiOperation(value = "Create an User with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully created user."),
            @ApiResponse(code = 500, message = "Failed to create the user. Try again later.")
    })
    public ResponseEntity<?> createUser(@RequestBody BaseUser newUser) {
        System.out.println("Received Request to created user: " + newUser);
        User user = new User(newUser);
        try {
            User result = userRepository.save(user);
            return ResponseEntity.ok(result);
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
    public ResponseEntity<?> updateUser(
            @RequestBody BaseUser update) {

        System.out.println("Received Request to update user: "
                + update.getFirstName() + " "
                + update.getLastName() + " "
                + update.getEmail()
                + update.isAdmin());

        try {
            User loadedUser = userRepository.findByEmail(update.getEmail());
            loadedUser.updateUser(update);
            userRepository.save(loadedUser);
            return ResponseEntity.ok(loadedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Delete an User with the given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully deleted user."),
            @ApiResponse(code = 500, message = "Failed to deleted the user. Try again later.")
    })
    public ResponseEntity<String> deleteUser(@PathVariable("id") long email) {

        System.out.println("Received Request to delete user: " + email);

        try {
            userRepository.deleteById(email);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update");
        }
    }
}
