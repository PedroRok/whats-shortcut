import React, { useState, useEffect } from "react";
import { EmojiPicker } from "frimousse";
import { getEmojis, saveEmojis } from "../utils/storage";
import { EmojiData } from "../utils/types";
import Sortable from "sortablejs";
import { useRef } from "react";

const Popup: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [emojis, setEmojis] = useState<EmojiData[]>([]);
  const [newEmoji, setNewEmoji] = useState("😊");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    (async () => {
      const saved = await getEmojis();
      setEmojis(saved);
    })();
  }, []);

  const handleAddEmoji = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmoji && newText) {
      const updated = [...emojis, { emoji: newEmoji, text: newText }];
      setEmojis(updated);
      await saveEmojis(updated);
      setNewEmoji("😊");
      setNewText("");
    }
  };

  const handleDrag = async (evt: Sortable.SortableEvent) => {
    const newOrder = await getEmojis();
    if (evt.oldIndex != null && evt.newIndex != null) {
      const movedItem = newOrder[evt.oldIndex];
      newOrder.splice(evt.oldIndex, 1);
      newOrder.splice(evt.newIndex, 0, movedItem);
    }
    setEmojis(newOrder);
    await saveEmojis(newOrder);
  };

  const handleDeleteEmoji = async (index: number) => {
    const updated = emojis.filter((_, i) => i !== index);
    setEmojis(updated);
    await saveEmojis(updated);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="w-96 p-4 font-sans text-whatsapp-green relative">
      <div className="flex flex-col items-center mb-4">
        <img
          src="icons/icon128.png"
          alt="Whats Shortcut Icon"
          className="w-8 h-8 mb-2"
        />
        <h1 className="text-lg font-bold">Whats Shortcut</h1>
        <div className="mb-2">
          por Pedro Lucas{" "}
          <u>
            <a href="https://pedrorok.com">(pedrorok.com)</a>
          </u>
        </div>
      </div>

      <section className="mb-4">
        <div
          ref={(el) => {
            if (el) {
              const sortable = Sortable.create(el, {
                animation: 150,
                direction: "horizontal",
                onEnd: (evt) => handleDrag(evt),
              });
              sortable.sort(emojis.map((_, index) => index.toString()));
            }
          }}
          className="flex flex-col gap-1.5 text-white max-h-32 overflow-y-scroll"
        >
          {emojis.map((item, index) => (
            <div
              key={index}
              data-id={index}
              className="flex items-center w-max bg-whatsapp-dark-green py-1 px-2.5 rounded cursor-move"
            >
              <span className="mr-1">{item.emoji}</span>
              <button
                onClick={() => copyToClipboard(item.text)}
                title="Copiar texto"
              >
                → {item.text.slice(0, 35)}
                {item.text.length > 35 ? "..." : ""}
              </button>
              <button
                className="bg-transparent border-none text-whatsapp-green cursor-pointer text-sm ml-1"
                onClick={() => handleDeleteEmoji(index)}
                title="Remover atalho"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      <form className="flex gap-1.5 mt-4" onSubmit={handleAddEmoji}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="flex-none w-8 h-8 flex items-center justify-center border text-xl border-gray-300 rounded bg-white"
          >
            {newEmoji}
          </button>

          {showPicker && (
            <div className="absolute z-50 mt-1">
              <EmojiPicker.Root
                className="isolate flex h-[260px] flex-col w-fit"
                onEmojiSelect={({ emoji }) => {
                  setShowPicker(false);
                  setNewEmoji(emoji);
                }}
              >
                <EmojiPicker.Viewport className="relative flex-1 outline-hidden">
                  <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
                    Loading…
                  </EmojiPicker.Loading>
                  <EmojiPicker.List
                    className="select-none pb-1.5"
                    components={{
                      CategoryHeader: ({ category, ...props }) => (
                        <div
                          className="bg-white px-3 pt-3 pb-1.5 font-medium text-xs text-neutral-900"
                          {...props}
                        >
                          {category.label}
                        </div>
                      ),
                      Emoji: ({ emoji, ...props }) => (
                        <button
                          className="flex size-[2.345rem] items-center justify-center rounded-md text-xl data-[active]:bg-neutral-100 dark:data-[active]:bg-whatsapp-green"
                          {...props}
                        >
                          {emoji.emoji}
                        </button>
                      ),
                    }}
                  />
                </EmojiPicker.Viewport>
              </EmojiPicker.Root>
            </div>
          )}
        </div>

        <textarea
          placeholder="Placeholder Text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 p-1.5 border border-gray-300 rounded max-h-24 h-8 min-h-[2rem]"
        />

        <button
          type="submit"
          className="px-2.5 py-1.5 bg-whatsapp-green text-white border-none rounded hover:bg-whatsapp-dark transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Popup;
