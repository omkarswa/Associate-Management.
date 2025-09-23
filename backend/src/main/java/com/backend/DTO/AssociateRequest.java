package com.backend.DTO;

public class AssociateRequest {
    private String name;
    private String dept;
    private Double salary;
    private Integer managerId; // only ID of manager

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }

    public Integer getManagerId() { return managerId; }
    public void setManagerId(Integer managerId) { this.managerId = managerId; }
}
