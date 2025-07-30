package com.job.auth.service;

import com.job.auth.model.Resume;
import com.job.auth.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    public Resume storeResume(MultipartFile file, String userId, String email) throws IOException {
        String resumeId = UUID.randomUUID().toString();
        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();

        if (!isAllowedType(contentType)) {
            throw new RuntimeException("Unsupported file type: " + contentType);
        }

        Resume resume = new Resume();
        resume.setResumeId(resumeId);
        resume.setUserId(userId);
        resume.setEmail(email);
        resume.setFileName(fileName);
        resume.setContentType(contentType);
        resume.setUploadedAt(new Date());
        resume.setFileData(file.getBytes());

        return resumeRepository.save(resume);
    }

    public List<Resume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    private boolean isAllowedType(String type) {
        return type != null && (
            type.equals("application/pdf") ||
            type.equals("application/msword") ||
            type.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
            type.startsWith("image/")
        );
    }
}
