// java
    package com.trophy.Trophy.Image;

    import java.time.LocalDateTime;

    public class ImageDTO {
        private String id;
        private String fileName;
        private String contentType;
        private Long size;
        private LocalDateTime uploadedAt;

        public ImageDTO() {}

        public ImageDTO(String id, String fileName, String contentType, Long size, LocalDateTime uploadedAt) {
            this.id = id;
            this.fileName = fileName;
            this.contentType = contentType;
            this.size = size;
            this.uploadedAt = uploadedAt;
        }

        public String getId() { return id; }
        public String getFileName() { return fileName; }
        public String getContentType() { return contentType; }
        public Long getSize() { return size; }
        public LocalDateTime getUploadedAt() { return uploadedAt; }

        public void setId(String id) { this.id = id; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public void setContentType(String contentType) { this.contentType = contentType; }
        public void setSize(Long size) { this.size = size; }
        public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    }