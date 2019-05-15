\documentclass{article}

<#if signatureImage?has_content>
    \usepackage{graphicx}
</#if>

\begin{document}

${recipientName} has been awarded ${awardName} by ${granterName} on ${dateAwarded}

<#if signatureImage?has_content>
    \fbox{\includegraphics[width=3cm]{${signatureImageFile}}}
<#else>

    (${granterName} has no signature on file.)

</#if>

\end{document}
