package com.backend.DTO;
public class AssociateDTO {
    private Integer id;
    private String name;
    private String dept;
    private Double salary;
    private String managerName;

    public AssociateDTO(Integer id, String name, String dept, Double salary, String managerName) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.salary = salary;
        this.managerName = managerName;
    }

    // Getters only (read-only)
    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getDept() { return dept; }
    public Double getSalary() { return salary; }
    public String getManagerName() { return managerName; }
}
