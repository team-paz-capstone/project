package github.paz.awardportal.util;

import github.paz.awardportal.exception.UnauthorizedException;
import github.paz.awardportal.model.User.User;
import github.paz.awardportal.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class SecurityUtil {

    @Autowired
    UserRepository userRepository;

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail((String) auth.getPrincipal());
    }

    public void assertAdminUser() {
        User user = getCurrentUser();
        if(!user.isAdmin()) {
            throw new UnauthorizedException();
        }
    }
}
