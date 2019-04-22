package github.paz.awardportal.pdf.exception;

public class PdfLatexExecutionException extends Exception {
    public PdfLatexExecutionException() {
        super();
    }

    public PdfLatexExecutionException(String message) {
        super(message);
    }

    public PdfLatexExecutionException(String message, Throwable cause) {
        super(message, cause);
    }

    public PdfLatexExecutionException(Throwable cause) {
        super(cause);
    }
}
