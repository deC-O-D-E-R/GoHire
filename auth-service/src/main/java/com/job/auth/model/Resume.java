package com.job.auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "resumes")
public class Resume {

    @Id
    private String id;

    private String resumeId;
    private String userId;
    private String email;
    private String fileName;
    private String contentType;
    private byte[] fileData;
    private Date uploadedAt;

    public Resume() {}

    public Resume(String resumeId, String userId, String email, String fileName, String contentType, byte[] fileData) {
        this.resumeId = resumeId;
        this.userId = userId;
        this.email = email;
        this.fileName = fileName;
        this.contentType = contentType;
        this.fileData = fileData;
        this.uploadedAt = new Date();
    }

    public String getId() {
        return id;
    }

    public String getResumeId() {
        return resumeId;
    }

    public void setResumeId(String resumeId) {
        this.resumeId = resumeId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public Date getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Date uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
