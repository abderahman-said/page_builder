export const interactiveScript = `
    document.addEventListener('DOMContentLoaded', () => {
        // Remove contentEditable
        const editableElements = document.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => el.removeAttribute('contenteditable'));

        // FAQ Accordion Logic
        const faqItems = document.querySelectorAll('[data-faq-item]');
        faqItems.forEach((item, index) => {
            const button = item.querySelector('[data-faq-button]');
            const content = item.querySelector('[data-faq-content]');
            const icon = item.querySelector('[data-faq-icon]');
            
            if (button && content) {
                button.addEventListener('click', () => {
                    const isOpen = content.classList.contains('max-h-0');
                    
                    // Close all others
                    faqItems.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index) {
                            const otherContent = otherItem.querySelector('[data-faq-content]');
                            const otherIcon = otherItem.querySelector('[data-faq-icon]');
                            if (otherContent) {
                                otherContent.classList.add('max-h-0', 'opacity-0');
                                otherContent.classList.remove('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');
                            }
                            if (otherIcon) {
                                otherIcon.classList.remove('bg-primary', 'text-primary-foreground', 'rotate-180');
                                otherIcon.classList.add('bg-background'); 
                            }
                            otherItem.classList.remove('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                        }
                    });

                    // Toggle current
                    if (isOpen) {
                        content.classList.add('max-h-0', 'opacity-0');
                        content.classList.remove('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');
                        
                        if(icon) {
                            icon.classList.remove('bg-primary', 'text-primary-foreground', 'rotate-180');
                            icon.classList.add('bg-background');
                        }
                        item.classList.remove('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                    } else {
                        content.classList.remove('max-h-0', 'opacity-0');
                        content.classList.add('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');

                        if(icon) {
                            icon.classList.add('bg-primary', 'text-primary-foreground', 'rotate-180');
                            icon.classList.remove('bg-background');
                        }
                        item.classList.add('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                    }
                });
            }
        });

        // Mobile Menu Logic
        const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                } else {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });
`;
