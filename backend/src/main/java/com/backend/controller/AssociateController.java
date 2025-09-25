package com.backend.controller;

import com.backend.DTO.AssociateDTO;
import com.backend.DTO.AssociateRequest;
import com.backend.Entity.Associate;
import com.backend.repository.AssociateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/associates")
public class AssociateController {

    @Autowired
    private AssociateRepository associateRepository;

    // ✅ READ all
    @GetMapping("/read")
    public List<AssociateDTO> readAll() {
        return associateRepository.findAll()
            .stream()
            .map(a -> new AssociateDTO(
                    a.getId(),
                    a.getName(),
                    a.getDept(),
                    a.getSalary(),
                    a.getManager() != null ? a.getManager().getName() : null
            ))
            .toList();
    }

    //read by id
    @GetMapping("/read/{id}")
    public AssociateDTO readById(@PathVariable Integer id) {
        Associate associate = associateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Associate not found"));
        return new AssociateDTO(
                associate.getId(),
                associate.getName(),
                associate.getDept(),
                associate.getSalary(),
                associate.getManager() != null ? associate.getManager().getName() : null
        );
    }

    

    // ✅ CREATE
    @PostMapping("/add")
    public AssociateDTO createAssociate(@RequestBody AssociateRequest request) {
        Associate manager = null;
        if (request.getManagerId() != null) {
            manager = associateRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
        }

        Associate associate = new Associate();
        associate.setName(request.getName());
        associate.setDept(request.getDept());
        associate.setSalary(request.getSalary());
        associate.setManager(manager);

        Associate saved = associateRepository.save(associate);

        return new AssociateDTO(
                saved.getId(),
                saved.getName(),
                saved.getDept(),
                saved.getSalary(),
                saved.getManager() != null ? saved.getManager().getName() : null
        );
    }

    // ✅ UPDATE
    @PutMapping("/edit/{id}")
    public AssociateDTO updateAssociate(@PathVariable Integer id, @RequestBody AssociateRequest request) {
        Associate associate = associateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Associate not found"));

        Associate manager = null;
        if (request.getManagerId() != null) {
            manager = associateRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
        }

        associate.setName(request.getName());
        associate.setDept(request.getDept());
        associate.setSalary(request.getSalary());
        associate.setManager(manager);

        Associate updated = associateRepository.save(associate);

        return new AssociateDTO(
                updated.getId(),
                updated.getName(),
                updated.getDept(),
                updated.getSalary(),
                updated.getManager() != null ? updated.getManager().getName() : null
        );
    }

    // ✅ DELETE (fixed)
    @DeleteMapping("/delete/{id}")
    public String deleteAssociate(@PathVariable Integer id) {
        associateRepository.deleteById(id);
        return "Associate with ID " + id + " deleted successfully!";
    }

    // ✅ COUNT
    @GetMapping("/count")
    public long countAssociates() {
        return associateRepository.count();
    }

    // ✅ SEARCH (fixed)
    @GetMapping("/search")
    public List<AssociateDTO> searchAssociates(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String managerName,
            @RequestParam(required = false) String dept) {

        List<Associate> associates;

        if (name != null) {
            associates = associateRepository.findByNameContainingIgnoreCase(name);
        } else if (managerName != null) {
            associates = associateRepository.findByManager_NameContainingIgnoreCase(managerName);
        } else if (dept != null) {
            associates = associateRepository.findByDeptContainingIgnoreCase(dept);
        } else {
            associates = associateRepository.findAll();
        }

        return associates.stream()
                .map(a -> new AssociateDTO(
                        a.getId(),
                        a.getName(),
                        a.getDept(),
                        a.getSalary(),
                        a.getManager() != null ? a.getManager().getName() : null
                ))
                .toList();
    }
}
