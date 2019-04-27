package github.paz.awardportal.controller;


import com.ibatis.common.jdbc.ScriptRunner;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.Connection;


@RestController()
@RequestMapping(value = "/api/db/")
@Api(value = "Award Management System", description = "Operations pertaining to award in Award Management System.")
public class DataBaseController {

    @Autowired
    private BasicDataSource dataSource;

    Resource resource = new ClassPathResource("../../resources/db/");

    @RequestMapping(value = "/seed", method = RequestMethod.POST)
    @ApiOperation(value = "Seed the database", response = String.class)
    public ResponseEntity<String> getAllAwards() {
        try (Connection connection = dataSource.getConnection()) {
            ScriptRunner runner = new ScriptRunner(connection, false, false);

            System.out.println(ResourceUtils.getURL("src/main/resources/db/seed_database.sql"));
            File file = ResourceUtils.getFile(ResourceUtils.getURL("src/main/resources/db/seed_database.sql"));

            String seedFilePath = file.getPath();
            InputStreamReader reader = new InputStreamReader(new FileInputStream(seedFilePath));
            runner.runScript(reader);
            reader.close();
        } catch (Exception error) {
            error.printStackTrace(System.out);
            return ResponseEntity.badRequest().body(error.toString());
        }
        return ResponseEntity.ok("Database Seeded");
    }

}
