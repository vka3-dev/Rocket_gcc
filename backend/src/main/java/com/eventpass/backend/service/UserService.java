package com.eventpass.backend.service;

import com.eventpass.backend.entity.User;
import com.eventpass.backend.entity.UserRole;
import com.eventpass.backend.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User create(User user) {
        if (user.getRole() == null) {
            user.setRole(UserRole.PARTICIPANT);
        }
        userRepository.findByUserEmail(user.getUserEmail()).ifPresent(existing -> {
            throw new IllegalArgumentException("Email is already registered");
        });
        userRepository.findByUserMobile(user.getUserMobile()).ifPresent(existing -> {
            throw new IllegalArgumentException("Mobile number is already registered");
        });
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
    }

    @Transactional
    public User update(Long id, User request) {
        User existing = getById(id);
        existing.setUserName(request.getUserName());
        existing.setUserMobile(request.getUserMobile());
        existing.setUserEmail(request.getUserEmail());
        if (request.getRole() != null) {
            existing.setRole(request.getRole());
        }
        return userRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        User user = getById(id);
        userRepository.delete(user);
    }
}
