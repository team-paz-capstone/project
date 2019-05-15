package github.paz.awardportal.model.Office;

import com.fasterxml.jackson.annotation.JsonIgnore;
import github.paz.awardportal.model.User.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "offices")
@Getter
@Setter
@RequiredArgsConstructor
public class Office {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "location")
    @NotNull
    private String location;

    @OneToMany(targetEntity = User.class, mappedBy = "office", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnore
    List<User> users = new ArrayList<>();

    @Override
    public String toString() {
        return "Office{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                '}';
    }

    public void updateOffice(Office update) {
        this.id = update.getId();
        this.name = update.getName();
        this.location = update.getLocation();
        this.users = update.getUsers();
    }
}
