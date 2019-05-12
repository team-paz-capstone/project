package github.paz.awardportal.controller;

import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller()
@RequestMapping(value = "/users")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // set up an encoder bean
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping("/list")
    public String listUsers(Model model) {
        List<User> users = userRepository.findAll();
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
    public String updateForm(@RequestParam("userId") Long id, Model model) {
        User user = userRepository.getOne(id);
        model.addAttribute("user", user);
        return "users/update-form";
    }


    @PostMapping("/create")
    public String save(@ModelAttribute("user") User user) {

        // encode user password before saving it
        final String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);
        return "redirect:/users/list";
    }


    @PostMapping("/update")
    public String update(@ModelAttribute("user") User user) {
        userRepository.save(user);
        return "redirect:/users/list";
    }


    @GetMapping("/delete")
    public String delete(@RequestParam("userId") Long id) {
        userRepository.deleteById(id);
        return "redirect:/users/list";
    }
}
