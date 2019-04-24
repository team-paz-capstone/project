package github.paz.awardportal.controller;

import github.paz.awardportal.model.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;

public class UserControllerTest extends AbstractTest {

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getUsersList() throws Exception {
        String uri = "/api/user/all";

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertThat(200).isEqualTo(status);
        String content = mvcResult.getResponse().getContentAsString();
        User[] userList = super.mapFromJson(content, User[].class);
        assertThat(userList.length).isEqualTo(3);
    }
}
