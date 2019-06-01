package github.paz.awardportal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/admin")
    public String admin() {
        return "index";
    }

    @RequestMapping(value = "/query")
    public String query() {
        return "index";
    }
}