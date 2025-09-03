package com.trophy.Trophy.DamagedTrophy;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface DamagedTrophyRepository extends MongoRepository<DamagedTrophy, String> {
    List<DamagedTrophy> findByTrophyCode(String trophyCode);
    Optional<DamagedTrophy> findByTrophyCodeAndSize(String trophyCode, Double size);
    void deleteByTrophyCodeAndSize(String trophyCode, Double size);
}
