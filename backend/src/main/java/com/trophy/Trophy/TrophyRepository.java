package com.trophy.Trophy;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface TrophyRepository extends MongoRepository<Trophy, String> {
    Optional<Trophy> findByTrophyCode(String trophyCode);
    void deleteByTrophyCode(String trophyCode);
}
