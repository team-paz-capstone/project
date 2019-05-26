package github.paz.awardportal.controller;


import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Office.Office;
import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.AwardRepository;
import github.paz.awardportal.repository.OfficeRepository;
import github.paz.awardportal.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController()
@RequestMapping(value = "/api/query")
@Api(value = "BI queries", description = "various BI queries")
@Log4j2
public class AdminQueryController {

    @Autowired
    private OfficeRepository officeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AwardRepository awardRepository;

    @RequestMapping(value = "/office_by_user_count", method = RequestMethod.GET)
    @ApiOperation(value = "list office ranked by user count", response = List.class)
    public ResponseEntity<Map<String, Integer>> getOfficeByUserCount() {
        log.info("Get - Office By User Count");

        Map<String, Integer> res = new HashMap<>();

        // Put all office name into the map, and "None" for user without an office
        List<Office> offices = officeRepository.findAll();
        for (Office office : offices) {
            res.put(office.getName(), 0);
        }
        res.put("None", 0);

        List<User> users = userRepository.findAll();

        // Count the number of users for each office
        for (User user : users) {
            Office userOffice = user.getOffice();
            if (userOffice != null && res.containsKey(userOffice.getName())) {
                res.put(userOffice.getName(), res.get(userOffice.getName()) + 1);
            } else {
                res.put("None", res.get("None") + 1);
            }
        }

        return ResponseEntity.ok(res);
    }


    @RequestMapping(value = "/user_by_award_count", method = RequestMethod.GET)
    @ApiOperation(value = "list user ranked by award count", response = List.class)
    public ResponseEntity<Map<String, Integer>> getUserByAwardCount() {
        log.info("Get - User By Office Count");

        Map<String, Integer> res = new HashMap<>();

        // Iterate through the award list, put the user and count of all award received in the hashmap
        List<Award> awards = awardRepository.findAll();
        for (Award award : awards) {
            String email = award.getRecipient().getEmail();
            res.put(email, res.getOrDefault(email, 0)+1);
        }

        return ResponseEntity.ok(res);
    }
}


