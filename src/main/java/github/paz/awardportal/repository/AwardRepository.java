package github.paz.awardportal.repository;

import github.paz.awardportal.model.Award.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface AwardRepository extends JpaRepository<Award, Long> {
    Optional<List<Award>> findByRecipientId(long id);
    Optional<List<Award>>  findByGranterId(long id);
    Optional<List<Award>>  findByAwardTypeId(long id);
}
