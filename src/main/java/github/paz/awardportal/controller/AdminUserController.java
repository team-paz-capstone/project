package github.paz.awardportal.controller;

import github.paz.awardportal.model.Office.Office;
import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.OfficeRepository;
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
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OfficeRepository officeRepository;

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
        return "redirect:/admin";
    }


    @GetMapping("/addForm")
    public String addForm(Model model) {
        User user = new User();
        List<Office> offices = officeRepository.findAll();

        model.addAttribute("user", user);
        model.addAttribute("offices", offices);

        return "users/create-user-form";
    }


    @GetMapping("/updateForm")
    public String updateForm(@RequestParam("userId") Long id, Model model) {

        User user = userRepository.getOne(id);
        List<Office> offices = officeRepository.findAll();

        model.addAttribute("user", user);
        model.addAttribute("offices", offices);

        return "users/update-user-form";
    }

    @GetMapping("/viewSignature")
    public String viewSignature(@RequestParam("userId") Long id, Model model) {
        User user = userRepository.getOne(id);

        model.addAttribute("user", user);

        return "users/view-signature";
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

        // encode user password before saving it
        final String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);
        return "redirect:/users/list";
    }


    @GetMapping("/delete")
    public String delete(@RequestParam("userId") Long id) {
        userRepository.deleteById(id);
        return "redirect:/users/list";
    }
}
