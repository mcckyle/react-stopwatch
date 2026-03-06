# react-stopwatch

A simple, modern stopwatch app built with **React**, **Vite**, and **Mantine UI**. Designed for focus and precision.

---

## Features

- ⚡ Instant load with [Vite](https://vitejs.dev/)
- 🎨 Modern UI with [Mantine UI](https://mantine.dev/)
- 💡 Minimalist design, dark-themed interface
- 📱 Responsive layout for desktop and mobile
- 🧠 Built with composability and future enhancements in mind!

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/mcckyle/react-stopwatch.git
cd react-stopwatch
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/) (for theme configuration)

---

## 📁 Project Structure

```
react-stopwatch/
├── .github/              # GitHub workflows (CI/CD).
├── public/               # Static assets (served as-is).
├── src/                  # Application Source code.
│   ├── components/       # Reusable React components.
│   │   ├── Stopwatch/
│   │   │   ├── Stopwatch.jsx
│   │   │   └── Stopwatch.module.css
│   │   │
│   │   ├── StopwatchHeader/
│   │   │   ├── StopwatchHeader.jsx
│   │   │   └── StopwatchHeader.module.css
│   │   │
│   │   ├── StopwatchDisplay/
│   │   │   ├── StopwatchDisplay.jsx
│   │   │   └── StopwatchDisplay.module.css
│   │   │
│   │   ├── StopwatchControls/
│   │   │   ├── StopwatchControls.jsx
│   │   │   └── StopwatchControls.module.css
│   │   │
│   │   ├── LapList/
│   │   │   ├── LapList.jsx
│   │   │   └── LapList.module.css
│   │   │
│   │   ├── AnimatedDigit/
│   │   │   ├── AnimatedDigit.jsx
│   │   │   └── AnimatedDigit.module.css
│   │   │
│   │   ├── HelpModal/
│   │   │   ├── HelpModal.jsx
│   │   │   └── HelpModal.module.css
│   │   │
│   │   ├── ThemeWrapper.jsx
│   │   └── theme.css
│   │     
│   ├── hooks/            # Custom React hooks.
│   │   ├── useStopwatch.js
│   │   └── useKeyboardShortcuts.js
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── utils/
│   │   └── formatTime.jsx
│   │
│   ├── __tests__/
│   │   ├── Stopwatch.test.jsx
│   │   ├── StopwatchDisplay.test.jsx
│   │   ├── StopwatchControls.test.jsx
│   │   ├── LapList.test.jsx
│   │   └── AnimatedDigit.test.jsx
│   │
│   ├── test/
│   │   └── test-utils.jsx
│   │
│   ├── App.jsx           # Main React application component.
│   ├── main.jsx          # React DOM entry point.
│   ├── App.css           # Styles specific to App.jsx.
│   └── index.css         # Global document-level styles.
│
├── .gitignore            # Specifies intentionally untracked files and folders to ignore.
├── LICENSE               # Open source license for the project.
├── README.md             # Project overview, instructions, and documentation.
├── babel.config.cjs      # Babel config for Jest.
├── eslint.config.js      # ESLint configuration.
├── index.html            # HTML entry point.
├── jest.config.js        # Jest testing configuration.
├── setUpTests.js         # Global setup for Jest tests.
├── vite.config.js        # Vite config for build and development.
├── package.json          # Project metadata, dependencies, and scripts.
└── package-lock.json     # Exact versions of installed dependencies.
```

---

## 🎯 Roadmap

- [x] Basic lap functionality.
- [x] Keyboard shortcuts for core controls.
- [x] Persist laps using browser localStorage.
- [x] Highlight fastest and slowest lap.
- [x] Add lap time deltas (difference from previous lap).
- [x] Add light/dark mode toggle with animation.
- [x] Clear laps functionality.
- [ ] Export laps to CSV or JSON.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
Feel free to extend it for your own projects, or contribute improvements back to the community.

---

## 🙌 Acknowledgments

This project was made possible thanks to the open-source community and the following technologies:

- [React](https://react.dev) - A modern library designed specifically for building fast, interactive UIs.
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling with lightning-fast dev server and build optimizations.
- [Mantine UI](https://mantine.dev/) - Accessible, fully-featured React components for building polished interfaces.

Special thanks to the broader open-source ecosystem for the inspiration and tools that empower developers to create and share freely.
