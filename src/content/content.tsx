import { createRoot } from 'react-dom/client';
import '../compiled.css';
import ShortcutButtons from './ShortcutButtons';

const observeWhatsApp = () => {
  if (!window.location.href.includes('web.whatsapp.com')) {
    return;
  }

  const observer = new MutationObserver(() => {
    const input = document.querySelector('[contenteditable="true"][data-tab="10"]');
    if (!input) return;

    const footer = (input as HTMLElement).closest('footer');
    if (!footer) return;

    const existingShortcutButtons = footer.querySelector('.shortcut-buttons');
    if (existingShortcutButtons) return;

    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'shortcut-buttons-container';
    
    if (footer.firstChild) {
      footer.firstChild.after(shortcutContainer);
    }

    const root = createRoot(shortcutContainer);
    
    root.render(<ShortcutButtons inputElement={input as HTMLElement} />);

    observer.disconnect();

    const chatObserver = new MutationObserver(() => {
      const currentInput = document.querySelector('[contenteditable="true"][data-tab="10"]');
      if (!currentInput) return;
      
      const currentFooter = (currentInput as HTMLElement).closest('footer');
      if (!currentFooter) return;

      const existingButtons = currentFooter.querySelector('.shortcut-buttons');
      if (!existingButtons) {
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });
    const mainContainer = document.querySelector('#main');
    if (mainContainer) {
      chatObserver.observe(mainContainer, { childList: true, subtree: true });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

window.addEventListener('load', observeWhatsApp);

if (document.readyState === 'complete') {
  observeWhatsApp();
}