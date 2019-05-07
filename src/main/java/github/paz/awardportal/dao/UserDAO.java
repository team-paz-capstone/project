package github.paz.awardportal.dao;

import github.paz.awardportal.model.User.User;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.jooq.exception.DataAccessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Connection;

import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
@Log4j2
public class UserDAO {
    private final String USERS_TABLE = "users";

    @Autowired
    private BasicDataSource dataSource;

    public User getUserById(int id) {
        User foundUser = null;

        try (Connection conn = dataSource.getConnection()) {
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


    public List<User> getAllUsers() {
        List<User> users = null;

        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            users = create.select().from("USERS").fetchInto(User.class);
        } catch (Exception ex) {
            log.warn("Error retrieving all users ", ex);
        }

        return users;
    }


    public void addUser(User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.insertInto(
                    table("users"),
                    field("first_name"),
                    field("last_name"),
                    field("email"),
                    field("password"),
                    field("is_admin")
            ).values(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    hashedPassword,
                    user.isAdmin())
                    .returning(field("id"))
                    .fetch();
        } catch (DataAccessException e) {
            log.warn("Error accessing the database ", e);
        } catch (Exception e) {
            log.warn("Error adding user " + user.toString(), e);
        }
    }


    public void updateUser(User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.update(
                    table("users"))
                    .set(field("first_name"), user.getFirstName())
                    .set(field("last_name"), user.getLastName())
                    .set(field("email"), user.getEmail())
                    .set(field("password"), hashedPassword)
                    .set(field("is_admin"), user.isAdmin())
                    .where("id=" + user.getId())
                    .returning(field("id"))
                    .fetchOne();
        } catch (DataAccessException e) {
            log.warn("Error accessing the database ", e);
        } catch (Exception e) {
            log.warn("Error updating user " + user.toString(), e);
        }
    }


    public void deleteUser(int id) {
        try (Connection connection = dataSource.getConnection()) {
            DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
            create.delete(table("users")).where("id=" + id).execute();
        } catch (DataAccessException e) {
            log.warn("Error accessing the database ", e);
        } catch (Exception e) {
            log.warn("Error delete user with id " + id, e);
        }
    }

}
