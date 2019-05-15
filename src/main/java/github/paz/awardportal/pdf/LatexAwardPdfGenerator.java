package github.paz.awardportal.pdf;


import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import github.paz.awardportal.model.Award.Award;
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

    public byte[] generateAwardPdf(AwardPdfTemplateData data) throws PdfGenerationException {
        PdfLatexFiles generatedFiles = null;

        try {
            Path signatureImageFile = createSignatureImageFile(data);
            Path texTemplate = createTemplateFileToConvert(data);
            generatedFiles = pdfLatexCommandRunner.convertTemplateToPdf(texTemplate);
            Path pdfFile = generatedFiles.getPdfFile();
            Files.deleteIfExists(signatureImageFile);
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

    // Creates jpg file for the signature to include in the Latex template.
    private Path createSignatureImageFile(AwardPdfTemplateData data) throws IOException {
        if(data.getSignatureImage() != null) {
            Path currentDirectory = Paths.get(".");
            Path signatureFile = Files.createTempFile(currentDirectory, "signature", ".jpg");
//            byte[] decoded = Base64.decode(data.getSignatureImage());
            Files.write(signatureFile, data.getSignatureImage());
            data.setSignatureImageFile(signatureFile.getFileName().toString());

            return signatureFile;
        }
        return null;
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
