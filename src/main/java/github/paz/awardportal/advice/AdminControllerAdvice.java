package github.paz.awardportal.advice;

import github.paz.awardportal.controller.AdminOfficeController;
import github.paz.awardportal.controller.AdminQueryController;
import github.paz.awardportal.controller.AdminUserController;
import github.paz.awardportal.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice(assignableTypes = {AdminOfficeController.class, AdminQueryController.class, AdminUserController.class})
public class AdminControllerAdvice {

    @ExceptionHandler(UnauthorizedException.class)
    protected ResponseEntity<String> handleUnauthorizedException(
            UnauthorizedException ex, WebRequest request) {

        return new ResponseEntity("User is not an administrator!", HttpStatus.FORBIDDEN);
    }
}
