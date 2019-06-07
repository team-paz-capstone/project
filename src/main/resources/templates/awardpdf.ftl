\documentclass{article}

<#if signatureImage?has_content>
    \usepackage{graphicx}
</#if>

\usepackage{color}
\definecolor{goldenpoppy}{rgb}{0.99, 0.76, 0.0}
\pagenumbering{gobble}

\begin{document}
\begin{center}
\textcolor{goldenpoppy}{{\Huge ${awardName}}}

\bigskip

has been awarded to

\bigskip

{\Huge ${recipientName}}

\bigskip

by

\bigskip

{\large ${granterName}}

\bigskip

<#if signatureImage?has_content>
    \fbox{\includegraphics[width=10cm]{${signatureImageFile}}}
<#else>
    (no signature image on file)
</#if>

\bigskip

{\large ${dateAwarded}}

\end{center}
\end{document}
