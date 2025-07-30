package com.job.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {

    @GetMapping("/JWTvalidate")
    public String validateToken() {
        return "JWT token is valid & You have accessed a protected route!";
    }
}
