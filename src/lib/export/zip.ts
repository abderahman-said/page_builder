import JSZip from 'jszip';
import { type LayoutSchema } from '../../types/store';
import { generateStandaloneHTML } from '../export';

export const generateZIPExport = async (layout: LayoutSchema): Promise<Blob> => {
    const zip = new JSZip();

    // List of assets to include from the public folder
    const assets = [
        '/pixels/zap-icon.svg',
        '/pixels/thumb-icon.svg',
        '/pixels/shape-icon.svg',
        '/pixels/features-showcase-1.png',
        '/pixels/features-showcase-2.png',
        '/pixels/hero-section-showcase.png',
        '/pixels/footer-logo.svg',
        '/pixels/logo.svg'
    ];

    // Add assets to the ZIP
    const assetPromises = assets.map(async (assetPath) => {
        try {
            const response = await fetch(assetPath);
            if (response.ok) {
                const blob = await response.blob();
                // Remove leading slash for the zip path
                const zipPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
                zip.file(zipPath, blob);
            }
        } catch (error) {
            console.error(`Failed to fetch asset: ${assetPath}`, error);
        }
    });

    await Promise.all(assetPromises);

    // Generate the index.html content
    const htmlContent = generateStandaloneHTML(layout);

    // Add files to the ZIP
    zip.file("index.html", htmlContent);

    // Add a README or other assets if needed in the future
    zip.file("README.txt", `Project: ${layout.name}\nGenerated with Page Builder\nDate: ${new Date().toLocaleString()}`);

    // Generate the ZIP blob
    const content = await zip.generateAsync({ type: "blob" });
    return content;
};
