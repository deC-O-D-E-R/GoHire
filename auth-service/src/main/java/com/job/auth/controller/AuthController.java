package com.job.auth.controller;

import com.job.auth.model.User;
import com.job.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.job.auth.util.JwtUtil;

// import org.springframework.data.redis.core.RedisTemplate;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // @Autowired
    // private RedisTemplate<String, Object> redisTemplate;

    // @Autowired
    // private ObjectMapper objectMapper;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        // String redisKey = "user:auth:" + user.getEmail();
        // User cachedUser = null;

        // try {
        //     Object cachedObj = redisTemplate.opsForValue().get(redisKey);
        //     if (cachedObj != null) {
        //         cachedUser = objectMapper.convertValue(cachedObj, User.class);
        //     }
        // } catch (Exception e) {
        //     cachedUser = null;
        // }

        // if (cachedUser == null) {
        User cachedUser = userRepository.findByEmail(user.getEmail());
        //     if (cachedUser == null) {
        //         return "User not found";
        //     }

        //     redisTemplate.opsForValue().set(redisKey, cachedUser, 1, TimeUnit.HOURS);
        // }

        if (!passwordEncoder.matches(user.getPassword(), cachedUser.getPassword())) {
            return "Incorrect password";
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return "Bearer " + token;
    }

}
