package github.paz.awardportal.pdf;

import github.paz.awardportal.pdf.exception.PdfLatexExecutionException;

import java.nio.file.Files;
import java.nio.file.Path;

public class PdfLatexCommandRunner {
    private static final String COMMAND = "pdflatex -escape-shell -halt-on-error %s";
    private Process pdfLatexProcess;

    public PdfLatexCommandRunner() { }

    public void convertTemplateToPdf(Path texTemplate) throws PdfLatexExecutionException {
        if(!Files.exists(texTemplate)) {
            throw new PdfLatexExecutionException("Cannot find template " + texTemplate);
        }

        String[] commandToRun = generateCommand(texTemplate);

        // Run the pdflatex.
        // Handle IOEx and process timeout --> PdfLatexExecutionException.
    }

    /*
    Returns command to pass to the pdflatex process builder.
     */
    private String[] generateCommand(Path texTemplate) {
        String templateFileName = texTemplate.getFileName().toString();
        String arg = COMMAND.format(templateFileName);
        return new String[] {"bash", "-c", arg};
    }
}
