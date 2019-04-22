package github.paz.awardportal.pdf.exception;

import java.util.Collections;
import java.util.List;

public class PdfLatexExecutionException extends Exception {
    private List<String> executedCommand;

    public PdfLatexExecutionException() {
        super();
    }

    public PdfLatexExecutionException(String message) {
        super(message);
    }

    public PdfLatexExecutionException(String message, Throwable cause) {
        super(message, cause);
    }

    public PdfLatexExecutionException(List<String> command, Throwable cause) {
        super(cause);
        executedCommand = Collections.unmodifiableList(command);
    }
}
