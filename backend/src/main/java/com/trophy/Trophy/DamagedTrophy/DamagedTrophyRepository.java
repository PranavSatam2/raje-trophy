package com.trophy.Trophy.DamagedTrophy;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DamagedTrophyRepository extends JpaRepository<DamagedTrophy, Long> {
    List<DamagedTrophy> findByTrophyCode(String trophyCode);
    Optional<DamagedTrophy> findByTrophyCodeAndSize(String trophyCode, Double size);

    @Transactional
    void deleteByTrophyCodeAndSize(String trophyCode, Double size);
}
