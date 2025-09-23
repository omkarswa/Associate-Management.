package com.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "associates")
public class Associate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String dept;

    private Double salary;


    
@ManyToOne
@JoinColumn(name = "manager_id")
@JsonIgnoreProperties({"manager"})   // prevents infinite nesting
private Associate manager;

    // ✅ Constructors
    public Associate() {}

    public Associate(String name, String dept, Double salary, Associate manager) {
        this.name = name;
        this.dept = dept;
        this.salary = salary;
        this.manager = manager;
    }

    // ✅ Getters & Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {   // <-- Must return the name, not throw exception
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Associate getManager() {
        return manager;
    }

    public void setManager(Associate manager) {
        this.manager = manager;
    }
}
