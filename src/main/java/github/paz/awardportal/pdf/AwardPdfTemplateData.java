package github.paz.awardportal.pdf;

import github.paz.awardportal.model.Award;
import github.paz.awardportal.model.User;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;

@Getter
@Setter
public class AwardPdfTemplateData {
    private static final String DATE_FORMAT = "dd MMM yyyy";
    private static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat(DATE_FORMAT);
    private String awardName;
    private String recipientName;
    private String granterName;
    private String dateAwarded;
    private String signatureImage;  // Base64-encoded signature image.
    private Boolean hasSignature;

    public static AwardPdfTemplateData fromAward(Award award) {
        AwardPdfTemplateData data = new AwardPdfTemplateData();
        // TODO - nullptr protection.
        User recipient = award.getRecipient();
        User granter = award.getGranter();

        data.setAwardName(award.getAwardType().getName());
        data.setRecipientName(recipient.getFirstName() + recipient.getLastName());
        data.setGranterName(granter.getFirstName() + granter.getLastName());
        data.setDateAwarded(DATE_FORMATTER.format(award.getTimestamp()));

        // TODO - template currently uses a hard-coded image.
        // This method will convert the granter's signature to a Base64-encoded
        // string for the template.
//        data.setSignatureImage(formatSignatureImage());
        data.setHasSignature(false);
        return data;

    }
    // TODO - generate from an Award.
    public AwardPdfTemplateData() {
//        awardName = "Employee of the Month";
//        recipientName = "John Doe";
//        granterName = "Jane Doe";
//        dateAwarded = "4/22/2019";
////        signatureImage = getSignatureImage();  Converts granter's Signature blob to Base64 string and sets bool.
//        hasSignature = false;
    }
}
