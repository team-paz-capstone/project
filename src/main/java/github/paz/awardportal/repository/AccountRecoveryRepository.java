package github.paz.awardportal.repository;

import github.paz.awardportal.model.AccountRecovery.AccountRecovery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AccountRecoveryRepository extends JpaRepository<AccountRecovery, Long> {

}
