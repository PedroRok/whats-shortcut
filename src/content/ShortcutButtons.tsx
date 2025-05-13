import React, { useState, useEffect } from "react";
import { getEmojis } from "../utils/storage";
import { EmojiData } from "../utils/types";

interface ShortcutButtonsProps {
  inputElement: HTMLElement;
}

const ShortcutButtons: React.FC<ShortcutButtonsProps> = ({ inputElement }) => {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);

  useEffect(() => {
    const loadEmojis = async () => {
      const savedEmojis = await getEmojis();
      setEmojis(savedEmojis);
    };

    loadEmojis();

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.emojis) {
        setEmojis(changes.emojis.newValue);
      }
    });
  }, []);

  const insertText = async (text: string) => {
    inputElement.focus();
    if (inputElement.textContent) {
      document.execCommand("insertText", false, text);
      return
    }
    const inputEvent = new InputEvent('input', {
      bubbles: false,
      cancelable: false,
      inputType: 'insertText',
      data: text
    });
    inputElement.dispatchEvent(inputEvent);
  };

  const openPopup = () => {
    chrome.runtime.sendMessage({ action: "openPopup" });
  };

  return (
    <div className="flex p-0.5 transparente rounded overflow-x-auto mb-1.5 ml-3 shortcut-buttons">
      {emojis.map((item, index) => (
        <button
          key={index}
          className="min-w-[30px] min-h-[30px] h-[30px] flex items-center justify-center mr-1.5 bg-whatsapp-box-color border rounded-full cursor-pointer text-base transition-all hover:bg-whatsapp-box-hover"
          onClick={() => insertText(item.text)}
          title={item.text}
        >
          {item.emoji}
        </button>
      ))}
      <button
        className="min-w-[30px] min-h-[30px] h-[30px] flex items-center justify-center mr-1.5 bg-whatsapp-box-color border rounded-full cursor-pointer text-base transition-all bg-whatsapp text-white border-none font bold"
        onClick={openPopup}
        title="Adicionar atalho"
      >
        +
      </button>
    </div>
  );
};

export default ShortcutButtons;
