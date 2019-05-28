package github.paz.awardportal.repository;

import github.paz.awardportal.model.AwardType.AwardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AwardTypeRepository extends JpaRepository<AwardType, Long> {
}
