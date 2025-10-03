import { EmojiData } from './types';

const DEFAULT_EMOJIS: EmojiData[] = [
  { emoji: '👋', text: 'Hi, how can I help you?' },
  { emoji: '👍', text: 'Ok, got it!' },
  { emoji: '🙏', text: 'Thank you very much!' },
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