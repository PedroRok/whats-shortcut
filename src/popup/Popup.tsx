import React, { useState, useEffect } from 'react';
import { getEmojis, saveEmojis } from '../utils/storage';
import { EmojiData } from '../utils/types';

const Popup: React.FC = () => {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);
  const [newEmoji, setNewEmoji] = useState('');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const loadEmojis = async () => {
      const savedEmojis = await getEmojis();
      setEmojis(savedEmojis);
    };
    
    loadEmojis();
  }, []);

  const handleAddEmoji = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newEmoji && newText) {
      const updatedEmojis = [...emojis, { emoji: newEmoji, text: newText }];
      setEmojis(updatedEmojis);
      await saveEmojis(updatedEmojis);
      setNewEmoji('');
      setNewText('');
    }
  };

  const handleDeleteEmoji = async (index: number) => {
    const updatedEmojis = emojis.filter((_, i) => i !== index);
    setEmojis(updatedEmojis);
    await saveEmojis(updatedEmojis);
  };

  return (
    <div className="w-full p-4 font-sans text-whatsapp-green">
      <h1 className="text-lg font-bold mb-3">Whats Shortcut</h1>
      
      <div className="mb-4">
        <h2 className="text-base font-semibold mb-2">Seus Atalhos</h2>
        <div className="flex flex-wrap gap-1.5 text-white">
          {emojis.map((item, index) => (
            <div key={index} className="flex items-center bg-whatsapp-dark-green py-1 px-2.5 rounded">
              <span className="mr-1">{item.emoji}</span>
              <span>→ {item.text.slice(0, 15)}{item.text.length > 15 ? '...' : ''}</span>
              <button 
              className="bg-transparent border-none text-whatsapp-green cursor-pointer text-sm ml-1"
              onClick={() => handleDeleteEmoji(index)}>×</button>
            </div>
          ))}
        </div>
      </div>
      
      <form className="flex gap-1.5 mt-4" onSubmit={handleAddEmoji}>
        <input
          type="text"
          placeholder="Emoji"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          maxLength={2}
          className="flex-none w-16 p-1.5 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Texto do atalho"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 p-1.5 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          className="px-2.5 py-1.5 bg-whatsapp-green text-white border-none rounded hover:bg-whatsapp-dark transition-colors"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default Popup;