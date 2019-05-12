//package github.paz.awardportal.model;
//
//import github.paz.awardportal.model.User.BaseUser;
//import github.paz.awardportal.model.User.User;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@ActiveProfiles("test")
//@RunWith(SpringRunner.class)
//public class UserTest {
//
//    private User testUser = new User(
//            1,
//            "Mr.",
//            "Smith",
//            "email@email.com",
//            "password",
//            false);
//
//    @Test
//    public void createUser() {
//        assertThat(testUser).isInstanceOf(User.class);
//        assertThat(testUser).isInstanceOf(BaseUser.class);
//    }
//
//    @Test
//    public void getId() {
//        assertThat(testUser.getId()).isEqualTo(1);
//    }
//
//    @Test
//    public void getFirstName() {
//        assertThat(testUser.getFirstName()).isEqualTo("Mr.");
//    }
//
//    @Test
//    public void getLastName() {
//        assertThat(testUser.getLastName()).isEqualTo("Smith");
//    }
//
//    @Test
//    public void getEmail() {
//        assertThat(testUser.getEmail()).isEqualTo("email@email.com");
//    }
//
//    @Test
//    public void getPassword() {
//        assertThat(testUser.isAdmin()).isEqualTo(false);
//    }
//}
