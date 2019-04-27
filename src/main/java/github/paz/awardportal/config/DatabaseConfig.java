package github.paz.awardportal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.commons.dbcp.BasicDataSource;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Bean
    public BasicDataSource dataSource() throws URISyntaxException {

        URI dbUri = new URI(System.getenv("DATABASE_URL"));
        System.out.println("dbUri: " + dbUri);
        String username = dbUri.getUserInfo().split(":")[0];
        System.out.println("username: " + username);

        String password = dbUri.getUserInfo().split(":")[1];
        System.out.println("password: " + password);

        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath()+ "?sslmode=require&amp;allowMultiQueries=true";

        System.out.println("dbUrl: " + dbUrl);

        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(dbUrl);
        basicDataSource.setUsername(username);
        basicDataSource.setPassword(password);

        return basicDataSource;
    }
}