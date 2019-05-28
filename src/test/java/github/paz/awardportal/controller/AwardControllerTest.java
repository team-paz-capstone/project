//package github.paz.awardportal.controller;
//
//import github.paz.awardportal.config.DatabaseConfig;
//import github.paz.awardportal.model.Award.Award;
//import github.paz.awardportal.model.AwardType.AwardType;
//import github.paz.awardportal.model.User.User;
//import org.apache.commons.dbcp.BasicDataSource;
//import org.junit.Before;
//import org.junit.Test;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import java.util.Arrays;
//import java.util.Calendar;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@EnableAutoConfiguration(exclude = {DatabaseConfig.class, BasicDataSource.class})
//public class AwardControllerTest extends AbstractTest {
//
//    @Override
//    @Before
//    public void setUp() {
//        super.setUp();
//    }
//
//    private static final User genericUser = new User(1, "mr", "smith", "mrsmith@email.com", "password", false);
//    private static final java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
//    private static final AwardType genericAwardType = new AwardType(1, "Executive Choice");
//    private static final List<Award> AWARDS = Arrays.asList(
//            new Award(1, genericUser, genericUser, genericAwardType, date),
//            new Award(2, genericUser, genericUser, genericAwardType, date),
//            new Award(3, genericUser, genericUser, genericAwardType, date)
//    );
//
//    @Test
//    public void getAllAwards() throws Exception {
//        String uri = "/api/award/all";
//
//        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
//                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
//
//        int status = mvcResult.getResponse().getStatus();
//        assertThat(200).isEqualTo(status);
//        String content = mvcResult.getResponse().getContentAsString();
//        Award[] awardList = super.mapFromJson(content, Award[].class);
//        assertThat(awardList.length).isEqualTo(3);
//    }
//
//    @Test
//    public void getAward() throws Exception {
//        String uri = "/api/award/1";
//
//        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
//                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
//
//        int status = mvcResult.getResponse().getStatus();
//        assertThat(200).isEqualTo(status);
//        String content = mvcResult.getResponse().getContentAsString();
//        Award award = super.mapFromJson(content, Award.class);
//        assertThat(award.getId()).isEqualTo(1);
//        assertThat(award.getRecipient().getId()).isEqualTo(genericUser.getId());
//        assertThat(award.getGranter().getId()).isEqualTo(genericUser.getId());
//        assertThat(award.getAwardType().getId()).isEqualTo(genericAwardType.getId());
////        assertThat(award.getTimestamp()).isEqualTo(date);
//    }
//
//    @Test
//    public void createAward() throws Exception {
//        String uri = "/api/award/create";
//
//        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
//                .contentType("application/json")
//                .header("recipientID", "1")
//                .header("granterID", "1")
//                .header("awardTypeID", "1")
//                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
//
//        int status = mvcResult.getResponse().getStatus();
//        assertThat(200).isEqualTo(status);
//    }
//
//    @Test
//    public void updateAward() throws Exception {
//        String uri = "/api/award/update";
//
//        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
//                .contentType("application/json")
//                .content("{\n" +
//                        "    \"id\": 1,\n" +
//                        "    \"recipient\": {\n" +
//                        "        \"firstName\": \"mr\",\n" +
//                        "        \"lastName\": \"smith\",\n" +
//                        "        \"email\": \"mrsmith@email.com\",\n" +
//                        "        \"password\": \"password\",\n" +
//                        "        \"id\": 1,\n" +
//                        "        \"admin\": false\n" +
//                        "    },\n" +
//                        "    \"granter\": {\n" +
//                        "        \"firstName\": \"mr\",\n" +
//                        "        \"lastName\": \"smith\",\n" +
//                        "        \"email\": \"mrsmith@email.com\",\n" +
//                        "        \"password\": \"password\",\n" +
//                        "        \"id\": 1,\n" +
//                        "        \"admin\": false\n" +
//                        "    },\n" +
//                        "    \"timestamp\": \"2019-04-26\",\n" +
//                        "    \"awardType\": {\n" +
//                        "        \"id\": 1,\n" +
//                        "        \"name\": \"Executive Choice\"\n" +
//                        "    }\n" +
//                        "}")
//                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
//
//        int status = mvcResult.getResponse().getStatus();
//        assertThat(200).isEqualTo(status);
//    }
//
//    @Test
//    public void deleteUser() throws Exception {
//        String uri = "/api/award/delete/1";
//
//        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
//                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
//
//        int status = mvcResult.getResponse().getStatus();
//        assertThat(200).isEqualTo(status);
//    }
//
//}
