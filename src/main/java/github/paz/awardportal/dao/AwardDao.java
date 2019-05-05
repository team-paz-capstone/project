package github.paz.awardportal.dao;

import github.paz.awardportal.dao.util.AwardDaoUtil;
import github.paz.awardportal.model.Award.Award;
import github.paz.awardportal.model.Award.AwardSkeleton;
import github.paz.awardportal.model.Award.BaseAwardCreator;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.dbcp.BasicDataSource;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.time.LocalDateTime;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@Component
@Log4j2
public class AwardDao {
    private final String AWARD_TABLE = "award";
    private final String FIELD_RECIPIENT_ID = "recipient_id";
    private final String FIELD_GRANTER_ID = "granter_id";
    private final String FIELD_AWARD_TYPE_ID = "award_type_id";
    private final String FIELD_TIMESTAMP = "awarded_datetime";

    @Autowired
    private BasicDataSource dataSource;

    @Autowired
    private AwardDaoUtil awardDaoUtil;

    public Award getAwardById(int id) {
        Award award = null;
        try(Connection conn = dataSource.getConnection()) {
            DSLContext context = DSL.using(conn, SQLDialect.POSTGRES);
            AwardSkeleton skeleton = context.select()
                    .from(AWARD_TABLE)
                    .where("id=" + id)
                    .fetchAny()
                    .into(AwardSkeleton.class);

             award = awardDaoUtil.resolveSkeletonToAward(skeleton);
        } catch (Exception ex) {
            log.warn("Exception retrieving award with id: " + id, ex);
        }
        return award;
    }

    public int createAward(BaseAwardCreator creator) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        try(Connection conn = dataSource.getConnection()) {
            DSLContext context = getContext(conn);
            Record createdRecord = context.insertInto(
                    table(AWARD_TABLE),
                    field(FIELD_RECIPIENT_ID),
                    field(FIELD_GRANTER_ID),
                    field(FIELD_AWARD_TYPE_ID),
                    field(FIELD_TIMESTAMP)
            ).values(
                    creator.getRecipientID(),
                    creator.getGranterID(),
                    creator.getAwardTypeID(),
                    now
            ).returning(field("id")
            ).fetchOne();

            return (int) createdRecord.get("id");
        }
    }

    private DSLContext getContext(Connection conn) {
        return DSL.using(conn, SQLDialect.POSTGRES);
    }
}
