import { type LayoutSchema } from '../../types/store';
import { getPixelsVariantStyles } from './styles';
import { interactiveScript } from './scripts';

export const getHTMLTemplate = (layout: LayoutSchema, componentsHTML: string, primaryRgb: string, secondaryRgb: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${layout.seo.title || layout.name}</title>
    <meta name="description" content="${layout.seo.description || ''}">
    ${layout.seo.ogImage ? `<meta property="og:image" content="${layout.seo.ogImage}">` : ''}
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: 'rgb(var(--primary) / <alpha-value>)',
                        secondary: 'rgb(var(--secondary) / <alpha-value>)',
                    },
                    fontFamily: {
                        sans: ['${layout.theme.fontFamily}', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=${layout.theme.fontFamily.replace(' ', '+')}:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: '${layout.theme.fontFamily}', sans-serif;
            background-color: ${layout.theme.mode === 'dark' ? (layout.name === 'Dark Mode SaaS' ? '#020617' : '#0f172a') : '#ffffff'};
            color: ${layout.theme.mode === 'dark' ? '#f8fafc' : '#0f172a'};
            margin: 0;
            overflow-x: hidden;
        }
        :root {
            --primary: ${primaryRgb};
            --secondary: ${secondaryRgb};
        }
        ${getPixelsVariantStyles()}
        
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${layout.theme.mode === 'dark' ? '#020617' : '#f1f5f9'}; }
        ::-webkit-scrollbar-thumb { background: rgb(var(--primary)); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: rgb(var(--primary) / 0.8); }
    </style>
</head>
<body>
    <div id="root">
        ${componentsHTML}
    </div>
    <script>
        ${interactiveScript}
    </script>
</body>
</html>
`;
