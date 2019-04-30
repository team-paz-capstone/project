package github.paz.awardportal.pdf;


import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import github.paz.awardportal.model.Award;
import github.paz.awardportal.pdf.exception.PdfGenerationException;
import github.paz.awardportal.pdf.exception.PdfLatexExecutionException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Component
@Log4j2
public class LatexAwardPdfGenerator implements AwardPdfGenerator {

    @Value("${award.pdf.template:award.ftl}")  // Use 'award.ftl' as default template.
    private String templateName;

    @Autowired
    private Configuration freemarker;

    @Autowired
    private PdfLatexCommandRunner pdfLatexCommandRunner;

    public byte[] generateAwardPdf(Award award) throws PdfGenerationException {
        AwardPdfTemplateData data = AwardPdfTemplateData.fromAward(award);
        return generateAwardPdf(data);
    }

    // TODO - uses hardcoded info for now.
    public byte[] generateAwardPdf(AwardPdfTemplateData data) throws PdfGenerationException {
        PdfLatexFiles generatedFiles = null;

        try {
            Path texTemplate = createTemplateFileToConvert(data);
            generatedFiles = pdfLatexCommandRunner.convertTemplateToPdf(texTemplate);
            Path pdfFile = generatedFiles.getPdfFile();
            return Files.readAllBytes(pdfFile);

        } catch(PdfLatexExecutionException | TemplateException | IOException ex) {
            throw new PdfGenerationException(ex);
        } finally {
            doCleanup(generatedFiles);
        }

    }

    private Path createTemplateFileToConvert(AwardPdfTemplateData templateData) throws IOException, TemplateException {
        Template template = freemarker.getTemplate(templateName);
        String processedTemplate = FreeMarkerTemplateUtils.processTemplateIntoString(template, templateData);
        Path templateFile = createEmptyTemplateFile();
        Files.write(templateFile, processedTemplate.getBytes());
        return templateFile;
    }

    private Path createEmptyTemplateFile() throws IOException {
        Path currentDirectory = Paths.get(".");
        return Files.createTempFile(currentDirectory, "award", ".tex");
    }

    private void doCleanup(PdfLatexFiles files) {
        if(files != null) {
            for(Path fileToDelete: files.getAll()) {
                try {
                    Files.deleteIfExists(fileToDelete);
                } catch (IOException ioex) {
                    log.warn("Unable to delete temp file " + fileToDelete, ioex);
                }
            }
        }
    }
}
