package github.paz.awardportal.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.Statement;


@RestController()
@RequestMapping(value = "/api/db/")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class DataBaseController {

    @Autowired
    private BasicDataSource dataSource;

    @RequestMapping(value = "/seed", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> getAllAwards() {
        try (Connection connection = dataSource.getConnection()) {
            connection.setAutoCommit(false);
            String command = getCommand();
            Statement statement = connection.createStatement();
            String[] parts = command.split(";");
            for (String part : parts) {
                System.out.println("Executing: " + part);
                int returned = statement.executeUpdate(part + ";");
                connection.commit();
                System.out.println("Returned: " + returned);
            }
        } catch (Exception error) {
            error.printStackTrace(System.out);
            return ResponseEntity.badRequest().body(error.toString());
        }
        return ResponseEntity.ok("Database Seeded");
    }

    private String getCommand() throws IOException {
        File file = ResourceUtils.getFile(ResourceUtils.getURL("src/main/resources/db/seed_database.sql"));
        String seedFilePath = file.getPath();
        return new String(Files.readAllBytes(Paths.get(seedFilePath)), StandardCharsets.UTF_8);
    }

}