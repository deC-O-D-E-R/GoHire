package com.job.auth.repository;

import com.job.auth.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserId(String userId);
    List<Resume> findByEmail(String email);
    Optional<Resume> findByResumeIdAndUserId(String resumeId, String userId);
}
