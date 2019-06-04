package github.paz.awardportal.controller;
import github.paz.awardportal.model.Office.Office;
import github.paz.awardportal.repository.OfficeRepository;
import github.paz.awardportal.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller()
@RequestMapping(value = "/offices")
public class AdminOfficeController {

    @Autowired
    private OfficeRepository officeRepository;

    @Autowired
    SecurityUtil securityUtil;

    @GetMapping("/list")
    public String listOffices(Model model) {
        securityUtil.assertAdminUser();
        List<Office> offices = officeRepository.findAll();
        model.addAttribute("offices", offices);
        return "redirect:/admin";
    }


    @GetMapping("/addForm")
    public String addForm(Model model) {
        securityUtil.assertAdminUser();
        Office office = new Office();
        model.addAttribute("office", office);
        return "offices/create-office-form";
    }


    @GetMapping("/updateForm")
    public String updateForm(@RequestParam("officeId") Long id, Model model) {
        securityUtil.assertAdminUser();
        Office office = officeRepository.getOne(id);
        model.addAttribute("office", office);
        return "offices/update-office-form";
    }


    @PostMapping("/create")
    public String save(@ModelAttribute("office") Office office) {
        securityUtil.assertAdminUser();
        officeRepository.save(office);
        return "redirect:/offices/list";
    }


    @PostMapping("/update")
    public String update(@ModelAttribute("office") Office office) {
        securityUtil.assertAdminUser();
        officeRepository.save(office);
        return "redirect:/offices/list";
    }


    @GetMapping("/delete")
    public String delete(@RequestParam("officeId") Long id) {
        securityUtil.assertAdminUser();
        officeRepository.deleteById(id);
        return "redirect:/offices/list";
    }
}


