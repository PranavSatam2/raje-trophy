package com.trophy.Trophy.Image;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;
    import org.springframework.data.mongodb.core.mapping.Field;

    import java.time.LocalDateTime;

    @Document(collection = "images")
    public class Image {

        @Id
        private String id;

        private String fileName;
        private String contentType;
        private Long size;
        private LocalDateTime uploadedAt;

        @Field("data")
        private byte[] data;

        public Image() {}

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }

        public String getContentType() { return contentType; }
        public void setContentType(String contentType) { this.contentType = contentType; }

        public Long getSize() { return size; }
        public void setSize(Long size) { this.size = size; }

        public LocalDateTime getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

        public byte[] getData() { return data; }
        public void setData(byte[] data) { this.data = data; }
    }