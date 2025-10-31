/**
 * Sets up the event listener for the 'Download HTML' button.
 */
export function initDownloadButton() {
    const downloadBtn = document.getElementById('download-html-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Note: This now downloads the *clean* HTML, not including the JS/CSS.
            // For a self-contained file, a more complex build step would be needed.
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'logic_reasoning_site.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        });
    }
}