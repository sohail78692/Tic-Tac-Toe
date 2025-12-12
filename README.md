# 🎮 Tic-Tac-Toe

A modern, feature-rich Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript. Play against friends or challenge an AI opponent with multiple difficulty levels.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

### 🕹️ Game Modes
- **👥 Player vs Player** - Play locally with a friend
- **🤖 Player vs AI** - Challenge the computer with 4 difficulty levels:
  - **🟢 Easy** - Random moves, perfect for beginners
  - **🟡 Medium** - 50% chance of optimal play
  - **🟠 Hard** - 80% chance of optimal play
  - **🔴 Impossible** - Unbeatable AI using the Minimax algorithm

### 🎨 Visual Themes
Choose from 6 beautiful color themes:
- 💜 Purple (Default)
- 🌊 Ocean
- 🌅 Sunset
- 🌲 Forest
- 🔥 Fire
- 🌑 Dark

Theme preferences are saved automatically using localStorage.

### 🚀 Additional Features
- **📊 Score Tracking** - Keeps track of wins, losses, and draws across rounds
- **🔊 Sound Effects** - Audio feedback using Web Audio API for moves, wins, and draws
- **✨ Smooth Animations** - CSS animations for cell placements and winning highlights
- **🤔 AI Thinking Indicator** - Visual feedback while AI calculates its move
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices

## 🎯 Demo

Simply open `index.html` in your browser to start playing!

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Tic-Tac-Toe.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Tic-Tac-Toe
   ```

3. Open `index.html` in your preferred browser.

No build tools or dependencies required! ⚡

## 📁 Project Structure

```
Tic-Tac-Toe/
├── 📄 index.html    # Main HTML structure
├── 🎨 style.css     # Styles, themes, and responsive design
├── ⚙️ script.js     # Game logic, AI, and interactions
└── 📖 README.md     # Project documentation
```

## 🎲 How to Play

1. 🎯 Select a game mode (Player vs Player or Player vs AI)
2. 🎚️ If playing against AI, choose a difficulty level
3. ❌ Player X always goes first
4. 👆 Click on any empty cell to place your mark
5. 🏆 Get three in a row (horizontally, vertically, or diagonally) to win
6. 🔄 Use "New Round" to start a fresh game while keeping scores
7. 🔀 Use "Change Mode" to switch between game modes

## 🛠️ Technical Highlights

### 🧠 Minimax Algorithm
The AI uses the [Minimax algorithm](https://en.wikipedia.org/wiki/Minimax) for optimal decision-making in the "Impossible" difficulty, making it unbeatable. The algorithm recursively evaluates all possible game states to choose the best move.

### 📱 Responsive Design
The game adapts to various screen sizes:
- 🖥️ Desktop (1024px+)
- 📱 Tablet (481px - 1023px)
- 📲 Mobile (up to 480px)
- 🔄 Landscape mode support
- 👆 Touch device optimizations

### 🎨 CSS Custom Properties
Theming is implemented using CSS custom properties (variables), allowing seamless theme switching without JavaScript style manipulation.

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- 💻 Built with vanilla JavaScript - no frameworks or libraries required
- 🔊 Sound effects generated using the Web Audio API
- 🎨 Gradient backgrounds inspired by [uiGradients](https://uigradients.com)

---

Made with ❤️ by Sohail for learning and fun!
