# Alertbox for React

A ultra-lightweight, **zero-dependency**, Promise-based programmatic alert and confirmation popup utility for React. 

Built exclusively with core React Hooks (`useState`, `useRef`, `useContext`), it eliminates the need for separate `.css` style imports or heavy bundle managers. It provides a clean layout out of the box, offering a fully customizable style object wrapper.

---

## ✨ Features

- 📦 **Zero Dependencies:** No bundlers, external utilities, or styling preprocessors needed.
- 🔄 **Promise-Driven API:** Handle user confirmations natively using standard `async/await` syntax.
- ⏳ **Built-In Async Loaders:** Simply pass an asynchronous handler to `onConfirm` to display a reactive loader spinner and prevent double-submits.
- 🎨 **Deep Customization:** Fully customize colors, fonts, margins, and alignments via a declarative, element-targeted configuration object.
- ⚛️ **Pure React Hooks Architecture:** Built entirely on top of React Context, `useState`, and `useRef`.

---

## 📥 Demo

Check [Demo](https://react-alert-box.js.org)

---

## 📥 Installation

Install the package directly into your React project:



```bash
npm install alertbox-for-react

```

*Note: Requires `react` version `^16.8.0`, `^17.0.0`, `^18.0.0`, or `^19.0.0` as a peer dependency.*

---

## 🚀 Setup Guide

Wrap your application tree (usually in `App.js`, `main.jsx`, or `index.js`) inside the `AlertProvider`. This initializes the portal manager so you can invoke popups cleanly without rendering individual alert component tags everywhere.

```jsx
import React from 'react';
import { AlertProvider } from 'alertbox-for-react';
import Dashboard from './Dashboard';

function App() {
  return (
    // Optional: You can pass a `defaultOptions` object here for global styles/text
    <AlertProvider defaultOptions={{ confirmText: 'Okay', cancelText: 'Dismiss' }}>
      <Dashboard />
    </AlertProvider>
  );
}

export default App;

```

---

## 💻 Code Recipes

### Recipe 1: Simple Alert Popup (Fire and Forget)

Ideal for standard notifications or confirmation modals requiring a simple close or action choice.

```jsx
import React from 'react';
import { useAlert } from 'alertbox-for-react';

export default function SimpleDemo() {
  const alert = useAlert();

  const handleOpenAlert = () => {
    alert.show({
      title: "Discard Draft?",
      message: "Are you sure you want to delete your progress? This cannot be undone.",
      confirmText: "Discard Changes",
      cancelText: "Keep Editing",
      showCancel: true
    });
  };

  return <button onClick={handleOpenAlert}>Delete Draft</button>;
}

```

### Recipe 2: Promise Engine + Built-in Loader (Asynchronous)

When you map an `async` function block to `onConfirm`, the system intercepts the lifecycle, locks down button clicks, appends a rotation-animated loader element, and awaits your promise resolution.

```jsx
import React from 'react';
import { useAlert } from 'alertbox-for-react';

export default function AsyncDemo() {
  const alert = useAlert();

  const handleDeleteDatabase = async () => {
    // 1. Await confirmation resolve
    const confirmed = await alert.show({
      title: "Purge Cluster",
      message: "This will immediately disconnect all production database servers.",
      confirmText: "Purge Cluster",
      cancelText: "Abort",
      // 2. Map async execution logic
      onConfirm: async () => {
        // Simulating API network call latency
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Cluster successfully purged.");
      }
    });

    // 3. Catch true/false promise resolution
    if (confirmed) {
      alert.show({ title: "Success!", message: "Infrastructure updated.", showCancel: false });
    } else {
      console.log("Action canceled by user.");
    }
  };

  return <button onClick={handleDeleteDatabase}>Trigger Server Purge</button>;
}

```

### Recipe 3: Deep Object Style Customization

The package uses zero external stylesheets. Style adjustments are handled via inline mappings. Pass overrides for elements like `overlay`, `box`, `title`, `message`, `confirmBtn`, or `cancelBtn`.

```jsx
import React from 'react';
import { useAlert } from 'alertbox-for-react';

export default function CustomThemeDemo() {
  const alert = useAlert();

  const handleDarkThemedAlert = () => {
    alert.show({
      title: "Security Threat Blocked",
      message: "A malicious packet sequence was successfully mitigated.",
      confirmText: "Review Logs",
      style: {
        overlay: { backgroundColor: 'rgba(15, 23, 42, 0.85)' },
        box: { backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px' },
        title: { color: '#ef4444', fontWeight: 'bold', letterSpacing: '-0.5px' },
        message: { color: '#cbd5e1' },
        confirmBtn: { backgroundColor: '#ef4444', color: '#ffffff', borderRadius: '8px' },
        cancelBtn: { backgroundColor: '#334155', color: '#94a3b8', borderRadius: '8px' }
      }
    });
  };

  return <button onClick={handleDarkThemedAlert}>Open Cyber Warning</button>;
}

```

---

## ⚙️ Configuration Properties (`API Reference`)

You can supply the following properties to the `alert.show({})` method argument object:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `String` | `'Alert'` | The prominent header text at the top of the box layout. |
| `message` | `String` | `''` | Descriptive message details or body textual instructions. |
| `confirmText` | `String` | `'Confirm'` | Label string displayed inside the action/confirmation button. |
| `cancelText` | `String` | `'Cancel'` | Label string displayed inside the secondary dismiss button. |
| `showCancel` | `Boolean` | `true` | Toggles rendering constraints for the secondary cancel button. |
| `onConfirm` | `Function` | `undefined` | Callback (synchronous or `async` promise) executed when confirming. |
| `style` | `Object` | `{}` | Key-nested configuration container mapping custom inline CSS declarations. |

### Style Customization Target Nodes

To override layouts, pass CSS properties matching standard JavaScript style conventions within these dictionary target keys:

```js
style: {
  overlay:    { /* Background dimming curtain layers */ },
  box:        { /* Main modal container canvas dimensions */ },
  title:      { /* Heading typography and spacing configuration */ },
  message:    { /* Body descriptive typography attributes */ },
  actions:    { /* Flex layout button container properties */ },
  btn:        { /* Shared base style rules applied to both buttons */ },
  confirmBtn: { /* Specific style accents for the execution element */ },
  cancelBtn:  { /* Specific style accents for the rejection element */ },
  loader:     { /* Custom properties governing the spinner loop */ }
}

```

---
## Created By

Nouman Qamar  - [Profile](https://proofile.link)

## 📄 License

Distributed under the terms of the **MIT License**. Feel free to use, modify, and distribute this package in any commercial or personal project.