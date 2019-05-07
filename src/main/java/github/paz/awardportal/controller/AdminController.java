package github.paz.awardportal.controller;

import github.paz.awardportal.dao.UserDAO;
import github.paz.awardportal.model.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller()
@RequestMapping(value = "/users")
public class AdminController {

    @Autowired
    private UserDAO userDAO;


    @GetMapping("/list")
    public String listUsers(Model model) {
        List<User> users = null;

        users = userDAO.getAllUsers();

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

        User user = userDAO.getUserById(id);

        model.addAttribute("user", user);

        return "users/update-form";
    }


    @PostMapping("/create")
    public String save(@ModelAttribute("user") User user) {

        userDAO.addUser(user);

        return "redirect:/users/list";
    }


    @PostMapping("/update")
    public String update(@ModelAttribute("user") User user) {

        userDAO.updateUser(user);

        return "redirect:/users/list";
    }


    @GetMapping("/delete")
    public String delete(@RequestParam("userId") int id) {

        User user = null;

        user = userDAO.getUserById(id);

        // check if user with id exists in the database
        if (user != null) {
            userDAO.deleteUser(id);
        }

        return "redirect:/users/list";
    }
}
