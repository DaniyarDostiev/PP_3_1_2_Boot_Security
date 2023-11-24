package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.Optional;

@Controller
@RequestMapping("/admin")
public class AdminsController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminsController(UserRepository userRepository,
                            RoleRepository roleRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping()
    public String adminPage(Model model) {
        model.addAttribute("usersList", userRepository.findAll());
        return "admin";
    }

    @GetMapping("/edit/{id}")
    public String editPage(@PathVariable("id") int id, Model model) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            model.addAttribute("user", userOptional.get());
            model.addAttribute("allRoles", roleRepository.findAll());
            return "add_edit_user";
        }
        return "redirect:/admin";
    }

    @PatchMapping("/edit/{id}")
    public String saveEdit(@ModelAttribute("user") User user) {
        userRepository.save(user);
        return "redirect:/admin";
    }

    @GetMapping("/add")
    public String addPage(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("allRoles", roleRepository.findAll());
        return "add_edit_user";
    }

    @PostMapping("/add")
    public String saveAdd(@ModelAttribute("user") User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        Optional<User> userOptional = userRepository.findById(id);
        userOptional.ifPresent(userRepository::delete);
        return "redirect:/admin";
    }
}
