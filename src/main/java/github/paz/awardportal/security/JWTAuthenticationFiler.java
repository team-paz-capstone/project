package github.paz.awardportal.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static github.paz.awardportal.security.SecurityConstants.JWT_SECRET;
import static github.paz.awardportal.security.SecurityConstants.EXPIRATION_TIME;
import static github.paz.awardportal.security.SecurityConstants.TOKEN_HEADER;
import static github.paz.awardportal.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFiler extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFiler(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        try {
            // Body needs to be {"email":"myEmail", "password":"myPassword"}, I think.
            AuthenticationCredentials credentials = new ObjectMapper()
                    .readValue(req.getInputStream(), AuthenticationCredentials.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getEmail(),
                            credentials.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException ioex) {
            throw new RuntimeException("Error mapping user during authentication", ioex);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        // Upon successful authentication, generate a JWT to return to the client.
        String jwtToken = JWT.create()
                .withSubject(((User) authResult.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(JWT_SECRET.getBytes()));

        res.addHeader(TOKEN_HEADER, TOKEN_PREFIX + jwtToken);  // Return token to the client.
    }
}
