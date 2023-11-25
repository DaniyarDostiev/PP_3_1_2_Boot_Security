package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();

    User findByUsername(String username);

    Optional<User> findById(Integer id);

    void saveUser(User user);

    void deleteUser(User user);
}
