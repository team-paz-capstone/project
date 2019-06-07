//package github.paz.awardportal.model;
//
//import github.paz.awardportal.model.Award.Award;
//import github.paz.awardportal.model.AwardType.AwardType;
//import github.paz.awardportal.model.User.User;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.Calendar;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@ActiveProfiles("test")
//@RunWith(SpringRunner.class)
//public class AwardTest {
//
//    private static final User genericUser = new User(1, "mr", "smith", "mrsmith@email.com", "password", false);
//    private static final java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
//    private static final AwardType genericAwardType = new AwardType(1, "Executive Choice");
//    private static final Award testAward = new Award(
//            1, genericUser,
//            genericUser,
//            genericAwardType,
//            date);
//
//
//    @Test
//    public void createAward() {
//        assertThat(testAward).isInstanceOf(Award.class);
//    }
//
//    @Test
//    public void getId() {
//        assertThat(testAward.getId()).isEqualTo(1);
//    }
//
//    @Test
//    public void getGranter() {
//        assertThat(testAward.getGranter()).isEqualTo(genericUser);
//    }
//
//    @Test
//    public void getRecipient() {
//        assertThat(testAward.getRecipient()).isEqualTo(genericUser);
//    }
//
//    @Test
//    public void getAwardType() {
//        assertThat(testAward.getAwardType()).isEqualTo(genericAwardType);
//    }
//
//}
