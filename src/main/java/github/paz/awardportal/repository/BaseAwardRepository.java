package github.paz.awardportal.repository;

import github.paz.awardportal.model.Award.BaseAwardCreator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface BaseAwardRepository extends JpaRepository<BaseAwardCreator, Long> {

}
