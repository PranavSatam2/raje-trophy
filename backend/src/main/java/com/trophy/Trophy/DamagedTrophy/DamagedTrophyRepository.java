package com.trophy.Trophy.DamagedTrophy;

import com.trophy.Trophy.Trophy;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface DamagedTrophyRepository extends MongoRepository<DamagedTrophy, String> {
    Optional<DamagedTrophy> findByTrophyCode(String trophyCode);
    void deleteByTrophyCode(String trophyCode);
}
