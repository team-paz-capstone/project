package github.paz.awardportal.dao;

import github.paz.awardportal.model.User.User;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;

@Component
@Log4j2
public class UserDAO {
    private final String USERS_TABLE = "users";

    @Autowired
    private BasicDataSource dataSource;

    public User getUserById(int id) {
        User foundUser = null;

        try(Connection conn = dataSource.getConnection()) {
            DSLContext context = DSL.using(conn, SQLDialect.POSTGRES);
            foundUser = context.select()
                    .from(USERS_TABLE)
                    .where("id=" + id)
                    .fetchAny()
                    .into(User.class);

        } catch (Exception ex) {
            log.warn("Error retrieving user with id " + id, ex);
        }

        return foundUser;
    }
}
