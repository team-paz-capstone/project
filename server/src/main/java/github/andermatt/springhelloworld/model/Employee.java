package github.andermatt.springhelloworld.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Employee {

    private int id;
    private String firstName;
    private String lastName;
    private String email;
}
