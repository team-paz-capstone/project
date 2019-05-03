package github.paz.awardportal.pdf.exception;

public class PdfGenerationException extends Exception {
    public PdfGenerationException() {
        super();
    }

    public PdfGenerationException(String message) {
        super(message);
    }

    public PdfGenerationException(String message, Throwable cause) {
        super(message, cause);
    }

    public PdfGenerationException(Throwable cause) {
        super(cause);
    }
}
