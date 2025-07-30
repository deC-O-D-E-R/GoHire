package com.job.auth.controller;

import com.job.auth.model.Resume;
import com.job.auth.model.User;
import com.job.auth.repository.ResumeRepository;
import com.job.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal User user) {
        List<Resume> resumes = resumeRepository.findByUserId(user.getId());

        ProfileResponse profile = new ProfileResponse(
            user.getName(),
            user.getEmail(),
            user.getCreatedAt(),
            resumes
        );

        return ResponseEntity.ok(profile);
    }

    public static class ProfileResponse {
        public String name;
        public String email;
        public Date activeSince;
        public List<Resume> resumes;

        public ProfileResponse(String name, String email, Date activeSince, List<Resume> resumes) {
            this.name = name;
            this.email = email;
            this.activeSince = activeSince;
            this.resumes = resumes;
        }
    }
}
