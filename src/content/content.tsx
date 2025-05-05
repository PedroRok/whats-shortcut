import React from 'react';
import { createRoot } from 'react-dom/client';
import '../compiled.css';
import ShortcutButtons from './ShortcutButtons';

// Função para observar mudanças no DOM e adicionar os botões de atalho
const observeWhatsApp = () => {
  // Verificar se já estamos na página do WhatsApp Web
  if (!window.location.href.includes('web.whatsapp.com')) {
    return;
  }

  // Criar um MutationObserver para detectar alterações no DOM
  const observer = new MutationObserver(() => {
    // Verificar se o rodapé do chat está presente
    const input = document.querySelector('[contenteditable="true"][data-tab="10"]');
    if (!input) return;

    const footer = (input as HTMLElement).closest('footer');
    if (!footer) return;

    // Verificar se já adicionamos os botões
    const existingShortcutButtons = footer.querySelector('.shortcut-buttons');
    if (existingShortcutButtons) return;

    // Criar container para botões de atalho
    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'shortcut-buttons-container';
    
    // Inserir antes do campo de entrada
    if (footer.firstChild) {
      footer.firstChild.after(shortcutContainer);
    }

    // Renderizar componente React
    const root = createRoot(shortcutContainer);
    
    root.render(<ShortcutButtons inputElement={input as HTMLElement} />);

    // Desconectar o observer após adicionar os botões
    observer.disconnect();

    // Adicionar um novo observer para detectar mudanças de chat
    const chatObserver = new MutationObserver(() => {
      // Se mudarmos de chat, precisamos verificar novamente
      const currentInput = document.querySelector('[contenteditable="true"][data-tab="10"]');
      if (!currentInput) return;
      
      const currentFooter = (currentInput as HTMLElement).closest('footer');
      if (!currentFooter) return;

      // Verificar se já adicionamos os botões no chat atual
      const existingButtons = currentFooter.querySelector('.shortcut-buttons');
      if (!existingButtons) {
        // Reiniciar o processo principal para este novo chat
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });

    // Observar mudanças na área principal de chat
    const mainContainer = document.querySelector('#main');
    if (mainContainer) {
      chatObserver.observe(mainContainer, { childList: true, subtree: true });
    }
  });

  // Iniciar observação
  observer.observe(document.body, { childList: true, subtree: true });
};

// Executar quando o conteúdo for carregado
window.addEventListener('load', observeWhatsApp);

// Executar também imediatamente, caso a página já esteja carregada
if (document.readyState === 'complete') {
  observeWhatsApp();
}