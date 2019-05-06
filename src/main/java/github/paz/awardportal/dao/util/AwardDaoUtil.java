package github.paz.awardportal.dao.util;

import github.paz.awardportal.dao.AwardTypeDao;
import github.paz.awardportal.dao.UserDAO;
import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Award.AwardSkeleton;
import github.paz.awardportal.model.AwardType.AwardType;
import github.paz.awardportal.model.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AwardDaoUtil {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private AwardTypeDao awardTypeDao;

    // Populates embedded fields.
    public Award resolveSkeletonToAward(AwardSkeleton skeleton) {
        Award award = new Award();
        award.setId(skeleton.getId());

        User recipient = userDAO.getUserById(skeleton.getRecipientID());
        User granter = userDAO.getUserById(skeleton.getGranterID());
        AwardType awardType = awardTypeDao.getAwardTypeById(skeleton.getAwardTypeID());

        award.setRecipient(recipient);
        award.setGranter(granter);
        award.setAwardType(awardType);
        award.setTimestamp(skeleton.getTimestamp());

        return award;
    }
}
