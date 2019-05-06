package github.paz.awardportal.dao;

import github.paz.awardportal.model.AwardType.AwardType;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;

@Component
@Log4j2
public class AwardTypeDao {

    private final String AWARD_TYPE_TABLE = "award_type";

    @Autowired
    private BasicDataSource dataSource;

    public AwardType getAwardTypeById(int id) {
        AwardType foundAwardType = null;

        try(Connection conn = dataSource.getConnection()) {
            DSLContext context = DSL.using(conn, SQLDialect.POSTGRES);
            foundAwardType = context.select()
                    .from(AWARD_TYPE_TABLE)
                    .where("id=" + id)
                    .fetchAny()
                    .into(AwardType.class);
        } catch (Exception ex) {
            log.warn("Error retrieving award type with id: " + id, ex);
        }

        return foundAwardType;
    }
}
