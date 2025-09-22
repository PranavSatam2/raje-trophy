package com.trophy.Trophy;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB IDs are usually String (ObjectId)

    private String username;
    private String password;

    // Getters and setters are already handled by Lombok (@Data),
    // but if you want explicit ones, you can still add them.
}
