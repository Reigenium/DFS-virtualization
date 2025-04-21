# 🧠 DFS Maze Visualizer

A Python + Pygame tool that visually demonstrates how Depth-First Search (DFS) explores and solves a randomly generated maze.

---

## 🎮 Features

- ✅ Real-time DFS path visualization with color-coded trail
- 🔊 Sound effects for:
  - Stepping through the maze
  - Backtracking
  - Reaching the goal
- 🟩 Clickable UI with:
  - Restart button
  - Generate New Maze button
  - Difficulty Selection (Easy, Medium, Hard)
- 🧠 Manual start point selection (click any walkable tile)
- ❗ 'No path found' indicator if no solution is possible
- 🕒 Timer showing how long the solution took
- 📊 Step counter and current difficulty indicator

---

## 🎨 Color Legend

| Color | Meaning              |
|-------|----------------------|
| ⚪ White  | Walkable cell      |
| ⚫ Black  | Wall/Blocked       |
| 🟧 Orange | Currently visiting |
| 🟥 Red    | Backtracking       |
| 🟩 Green  | Path to exit       |
| 🔵 Blue   | Exit (goal)        |

---

## 🧪 How to Run

1. Clone the repo:

```bash
git clone https://github.com/AyoTecca/DFS-Maze-Visualizer.git
cd DFS-Maze-Visualizer
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run:

```bash
python main.py
```

---

## 🧠 Controls

| Action            | How                                          |
|-------------------|-----------------------------------------------|
| Restart           | Click **Restart (R)**                         |
| New Maze          | Click **New Maze (N)**                        |
| Set Start Point   | Click any white tile                          |
| Change Difficulty | Click **Easy (1)**, **Medium (2)**, **Hard (3)** |
| Exit              | Close the window or press Ctrl+C              |

---

## 📁 Files Overview

| File           | Description                  |
|----------------|------------------------------|
| `main.py`       | Entry point & event loop     |
| `maze.py`       | Maze generation logic        |
| `visualizer.py` | Drawing and sound effects    |
| `assets/`       | Sound files (step, found, backtrack) |

---

## 🙌 Credits

- Developed by **[@AyoTecca](https://github.com/AyoTecca)**
- Built with ❤️ using [Python](https://www.python.org/) and [Pygame](https://www.pygame.org/)