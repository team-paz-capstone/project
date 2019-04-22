package github.paz.awardportal.pdf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwardPdfTemplateData {
    private String awardName;
    private String recipientName;
    private String granterName;
    private String dateAwarded;
    private String signatureImage;  // Base64-encoded signature image.
    private Boolean hasSignature;

    //public static AwardPdfTemplateData fromAward(Award award);
    // TODO - generate from an Award.
    public AwardPdfTemplateData() {
        awardName = "Employee of the Month";
        recipientName = "John Doe";
        granterName = "Jane Doe";
        dateAwarded = "4/22/2019";
//        signatureImage = getSignatureImage();  Converts granter's Signature blob to Base64 string and sets bool.
        hasSignature = false;
    }
}
