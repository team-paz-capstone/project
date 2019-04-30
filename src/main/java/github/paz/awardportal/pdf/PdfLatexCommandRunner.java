package github.paz.awardportal.pdf;

import github.paz.awardportal.pdf.exception.PdfLatexExecutionException;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

@Component
@Log4j2
public class PdfLatexCommandRunner {
    private static final String COMMAND = "pdflatex -escape-shell -halt-on-error %s";

    public PdfLatexCommandRunner() { }

    public PdfLatexFiles convertTemplateToPdf(Path texTemplate) throws PdfLatexExecutionException {
        if(!Files.exists(texTemplate)) {
            throw new PdfLatexExecutionException("Cannot find template " + texTemplate);
        }

        PdfLatexFiles generatedFiles = new PdfLatexFiles(texTemplate);
        List<String> commandToRun = generateCommand(texTemplate);
        ProcessBuilder builder = new ProcessBuilder().command(commandToRun);
        int returnCode = 1;
        log.info("Executing command: " + commandToRun);

        try {
            Process pdfLatexProcess = builder.start();
            returnCode = pdfLatexProcess.waitFor();
            log.info("pdflatex process has completed execution with return code: " + returnCode);

        } catch (IOException ioex) {
            throw new PdfLatexExecutionException(commandToRun, ioex);
        } catch (InterruptedException intex) {  // TODO - is this correct?
            Thread.currentThread().interrupt();
            throw new PdfLatexExecutionException(commandToRun, intex);
        }

        if (isErrorCode(returnCode)) {
            //TODO - able to capture stderr of the process?
            throw new PdfLatexExecutionException("pdflatex exited with error code: " + returnCode);
        }

        return generatedFiles;

        // TODO - handle process timeout?
    }

    /*
    Returns command to pass to the pdflatex process builder.
     */
    private List<String> generateCommand(Path texTemplate) {
        String templateFileName = texTemplate.getFileName().toString();
        String arg = String.format(COMMAND, templateFileName);
        return Arrays.asList("bash", "-c", arg);
    }

    private boolean isErrorCode(int returnCode) {
        return returnCode != 0;
    }
}
