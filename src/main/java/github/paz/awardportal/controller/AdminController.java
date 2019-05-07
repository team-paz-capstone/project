package github.paz.awardportal.controller;

import github.paz.awardportal.model.User.User;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SQLDialect;
import org.jooq.exception.DataAccessException;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Controller()
@RequestMapping(value = "/users")
public class AdminController {

  @Autowired
  private BasicDataSource dataSource;

  @GetMapping("/list")
  public String listUsers(Model model) {
    List<User>  users = null;

    try (Connection connection = dataSource.getConnection()){
      DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
      users = create.select().from("USERS").fetchInto(User.class);
    } catch (Exception e) {
      e.printStackTrace();
    }

    model.addAttribute("users", users);

    return "users/list-users";
  }

  @GetMapping("/addForm")
  public String addForm(Model model) {
    User user = new User();

    model.addAttribute("user", user);

    return "users/create-form";
  }

  @GetMapping("/updateForm")
  public String updateForm(@RequestParam("userId") int id, Model model) {

    try (Connection connection = dataSource.getConnection()){
      DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
      User user = create.select().from("USERS").where("id=" + id).fetchAny().into(User.class);
      model.addAttribute("user", user);
    } catch (NullPointerException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return "users/update-form";
  }

  @PostMapping("/create")
  public String save(@ModelAttribute("user") User user){
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    String hashedPassword = passwordEncoder.encode(user.getPassword());
    try (Connection connection = dataSource.getConnection()){
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
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return "redirect:/users/list";
  }

  @PostMapping("/update")
  public String update(@ModelAttribute("user") User user){

    System.out.println(user.toString());

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    String hashedPassword = passwordEncoder.encode(user.getPassword());
    try (Connection connection = dataSource.getConnection()){
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
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return "redirect:/users/list";
  }

  @GetMapping("/delete")
  public String delete(@RequestParam("userId") int id){

    try (Connection connection = dataSource.getConnection()){
      DSLContext create = DSL.using(connection, SQLDialect.POSTGRES);
      create.delete(table("users")).where("id=" + id).execute();
    } catch (DataAccessException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return "redirect:/users/list";
  }
}
