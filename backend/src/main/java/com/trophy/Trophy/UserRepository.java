package com.trophy.Trophy;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}
