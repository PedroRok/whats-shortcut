# WhatsApp Shortcut Extension

A Chrome extension that enhances WhatsApp Web by adding customizable emoji shortcuts and quick insert buttons directly into the chat input. Save, organize, and insert your frequently used emojis and predefined text snippets with a single click.

## Features

* **Custom Shortcut Buttons**: Display a horizontal bar of emoji shortcuts directly under the message input.
* **Popup Manager**: Add, edit, reorder, and delete emoji shortcuts via an interactive popup window.
* **Persistent Storage**: All shortcuts and their mappings are stored using Chrome storage APIs and sync across sessions.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PedroRok/whatsapp-shortcut-extension.git
   cd whatsapp-shortcut-extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build**

   * For production:

     ```bash
     npm run build
     ```
   * For development (with file watching):

     ```bash
     npm run build:dev
     npm run watch
     ```

4. **Load into Chrome**

   1. Open `chrome://extensions` in your browser.
   2. Enable "Developer mode" in the top-right corner.
   3. Click "Load unpacked" and select the `dist/` (or your build output) directory.

5. **Open WhatsApp Web** and start chatting. The emoji shortcut bar will appear under the message input.

## Usage

### Shortcut Bar

* Click any emoji button to insert its associated text into the input field.
* Click the **+** button to open the Popup Manager.

### Popup Manager

* **Add Shortcut**: Select an emoji, enter a text snippet, and click **Add**.
* **Reorder**: Drag items horizontally to change their order.
* **Copy Text**: Click the text to copy to your clipboard.
* **Delete**: Click the × icon to remove a shortcut.

## Development

* **Tech Stack**: React (TypeScript), TailwindCSS, Frimousse (emoji picker), SortableJS, Webpack.
* **Scripts** (in `package.json`):

  * `build:css`: Compile Tailwind CSS.
  * `build`: Generate CSS and bundle with Webpack (production).
  * `build:dev`: Same as `build`, but in development mode.
  * `watch`: Recompile on file changes.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤ by PedroRok ([https://pedrorok.com](https://pedrorok.com))*
