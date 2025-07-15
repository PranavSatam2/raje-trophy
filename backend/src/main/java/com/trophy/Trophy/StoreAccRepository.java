package com.trophy.Trophy;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreAccRepository extends JpaRepository<Trophy, Long> {
    List<Trophy> findByTrophyCode(String trophyCode);
    void deleteByTrophyCode(String trophyCode);
    Optional<Trophy> findByTrophyCodeAndSize(String trophyCode, Double size);
    void deleteByTrophyCodeAndSize(String trophyCode, Double size);
}
