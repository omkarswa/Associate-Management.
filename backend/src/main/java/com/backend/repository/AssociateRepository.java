package com.backend.repository;

import com.backend.Entity.Associate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssociateRepository extends JpaRepository<Associate, Integer> {

    List<Associate> findByNameContainingIgnoreCase(String name);

    List<Associate> findByManager_NameContainingIgnoreCase(String managerName);

    List<Associate> findByDeptContainingIgnoreCase(String dept);

    // ✅ Google-style universal search
    @Query("SELECT a FROM Associate a " +
           "LEFT JOIN a.manager m " +
           "WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "   OR LOWER(a.dept) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "   OR LOWER(m.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "   OR CAST(a.salary AS string) LIKE CONCAT('%', :query, '%')")
    List<Associate> findByAllFields(@Param("query") String query);
}
