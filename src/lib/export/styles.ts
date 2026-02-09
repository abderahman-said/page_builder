export const getPixelsVariantStyles = () => `
    /* Scroll Animations for Pixels Variant */
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-100% / 3)); }
    }
    @keyframes scroll-reverse {
        0% { transform: translateX(calc(-100% / 3)); }
        100% { transform: translateX(0); }
    }
    .animate-scroll {
        animation: scroll 40s linear infinite;
    }
    .animate-scroll-reverse {
        animation: scroll-reverse 40s linear infinite;
    }
    
    /* Custom styles for pixels variant and interactive elements */
    .sticky { position: sticky; }
    .top-0 { top: 0px; }
    .z-50 { z-index: 50; }
    .w-full { width: 100%; }
    .border-b { border-bottom-width: 1px; }
    .border-white\\/5 { border-color: rgba(255, 255, 255, 0.05); }
    .bg-slate-950\\/50 { background-color: rgba(2, 6, 23, 0.5); }
    .backdrop-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
    .backdrop-blur-sm { backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
    .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .duration-300 { transition-duration: 300ms; }
    .duration-500 { transition-duration: 500ms; }
    
    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
    .pt-32 { padding-top: 8rem; }
    .pb-20 { padding-bottom: 5rem; }
    
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .gap-8 { gap: 2rem; }
    
    .h-8 { height: 2rem; }
    .h-full { height: 100%; }
    .w-max { width: max-content; }
    .w-80 { width: 20rem; }
    .shrink-0 { flex-shrink: 0; }
    
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-2xl { border-radius: 1rem; }
    .rounded-full { border-radius: 9999px; }
    
    .bg-pink-600 { background-color: #db2777; }
    .bg-pink-600\\/20 { background-color: rgba(219, 39, 119, 0.2); }
    .bg-pink-500\\/10 { background-color: rgba(236, 72, 153, 0.1); }
    .bg-pink-950\\/70 { background-color: rgba(80, 7, 36, 0.7); }
    .bg-pink-950\\/30 { background-color: rgba(80, 7, 36, 0.3); }
    .bg-slate-950 { background-color: #020617; }
    .bg-white\\/5 { background-color: rgba(255, 255, 255, 0.05); }
    .bg-white\\/10 { background-color: rgba(255, 255, 255, 0.1); }
    
    .border-pink-800 { border-color: #9d174d; }
    .border-pink-500\\/30 { border-color: rgba(236, 72, 153, 0.3); }
    .border-slate-800 { border-color: #1e293b; }
    .border-slate-700 { border-color: #334155; }
    
    .text-white { color: #ffffff; }
    .text-pink-500 { color: #ec4899; }
    .text-pink-600 { color: #db2777; }
    .text-slate-300 { color: #cbd5e1; }
    .text-slate-400 { color: #94a6b8; }
    .text-slate-500 { color: #64748b; }
    
    .blur-\\[120px\\] { filter: blur(120px); }
    .blur-3xl { filter: blur(64px); }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    
    .max-w-4xl { max-width: 56rem; }
    .max-w-2xl { max-width: 42rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    
    .aspect-video { aspect-ratio: 16 / 9; }
    .object-cover { object-fit: cover; }
    .overflow-hidden { overflow: hidden; }
    
    @media (min-width: 768px) {
        .md\\:px-12 { padding-left: 3rem; padding-right: 3rem; }
        .md\\:flex { display: flex; }
        .md\\:block { display: block; }
        .md\\:text-7xl { font-size: 4.5rem; line-height: 1; }
        .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    }
`;
