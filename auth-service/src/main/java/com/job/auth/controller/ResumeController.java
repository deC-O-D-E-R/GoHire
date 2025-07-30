package com.job.auth.controller;

import com.job.auth.model.Resume;
import com.job.auth.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId,
            @RequestParam("email") String email
    ) throws IOException {

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String contentType = file.getContentType();
        byte[] data = file.getBytes();

        Resume resume = new Resume();
        resume.setResumeId(UUID.randomUUID().toString());
        resume.setUserId(userId);
        resume.setEmail(email);
        resume.setFileName(originalFilename);
        resume.setContentType(contentType);
        resume.setFileData(data);
        resume.setUploadedAt(new Date());

        resumeRepository.save(resume);

        return ResponseEntity.ok("Resume uploaded successfully");
    }
}
