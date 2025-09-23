package com.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.Entity.Associate;

import java.util.List;

public interface AssociateRepository extends JpaRepository<Associate, Integer> {
    List<Associate> findByNameContainingIgnoreCase(String name);
    List<Associate> findByManager_NameContainingIgnoreCase(String managerName);
    List<Associate> findByDeptContainingIgnoreCase(String dept);
}
