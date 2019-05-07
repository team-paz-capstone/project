package github.paz.awardportal.repository;

import github.paz.awardportal.model.Award.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AwardRepository extends JpaRepository<Award, Long> {

}
