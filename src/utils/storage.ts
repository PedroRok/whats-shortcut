import { EmojiData } from './types';

// Emojis padrão
const DEFAULT_EMOJIS: EmojiData[] = [
  { emoji: '👋', text: 'Olá! Como posso ajudar?' },
  { emoji: '👍', text: 'Ok, entendido!' },
  { emoji: '🙏', text: 'Muito obrigado!' },
];

export const getEmojis = async (): Promise<EmojiData[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('emojis', (result) => {
      resolve(result.emojis || DEFAULT_EMOJIS);
    });
  });
};

export const saveEmojis = async (emojis: EmojiData[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ emojis }, () => {
      resolve();
    });
  });
};