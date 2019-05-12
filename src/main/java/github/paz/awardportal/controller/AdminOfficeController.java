package github.paz.awardportal.controller;
import github.paz.awardportal.model.Office.Office;
import github.paz.awardportal.repository.OfficeRepository;
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

    @GetMapping("/list")
    public String listOffices(Model model) {
        List<Office> offices = officeRepository.findAll();
        model.addAttribute("offices", offices);
        return "offices/list-offices";
    }


    @GetMapping("/addForm")
    public String addForm(Model model) {
        Office office = new Office();
        model.addAttribute("office", office);
        return "offices/create-office-form";
    }


    @GetMapping("/updateForm")
    public String updateForm(@RequestParam("officeId") Long id, Model model) {
        Office office = officeRepository.getOne(id);
        model.addAttribute("office", office);
        return "offices/update-office-form";
    }


    @PostMapping("/create")
    public String save(@ModelAttribute("office") Office office) {


        officeRepository.save(office);
        return "redirect:/offices/list";
    }


    @PostMapping("/update")
    public String update(@ModelAttribute("office") Office office) {
        officeRepository.save(office);
        return "redirect:/offices/list";
    }


    @GetMapping("/delete")
    public String delete(@RequestParam("officeId") Long id) {
        officeRepository.deleteById(id);
        return "redirect:/offices/list";
    }
}


