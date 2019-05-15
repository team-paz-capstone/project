package github.paz.awardportal.security;

public class SecurityConstants {
    public static final String JWT_SECRET = "ThisShouldBeAnEnvVar";
    public static final long EXPIRATION_TIME = 864_000_000;  // Tokens expire in 10 days.
    public static final String TOKEN_HEADER = "Authorization";  // JWT is included in this header.
    public static final String TOKEN_PREFIX = "Bearer ";  // Token prefix in the Authorization header.
    public static final String REGISTRATION_URL = "/api/user/create";  // Url for registration. This is a public route.
}
