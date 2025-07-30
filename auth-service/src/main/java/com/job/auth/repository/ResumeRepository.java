package com.job.auth.repository;

import com.job.auth.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserId(String userId);
    List<Resume> findByEmail(String email);
}
