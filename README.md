# Space Shooter 🚀

#### Video Demo: https://youtu.be/kiEZpItoby0

#### Description:
Space Shooter is a fast-paced 2D arcade game built using **Lua** and the **LÖVE (Love2D)** framework. In this game, the player controls a spaceship at the bottom of the screen, dodges incoming enemies, collects power-ups, and tries to survive as long as possible while racking up points. As the level increases, enemies spawn more frequently and move faster, increasing the challenge.

This project demonstrates important game development concepts like continuous input handling, collision detection, state management (levels, lives, score), and simple power-up mechanics. It's my CS50 Final Project, designed to show what I’ve learned about interactive programming, feedback loops, and balancing gameplay.

---

### Features

- Player spaceship that can move in all directions (using arrow keys or WASD)  
- Shooting mechanism (space bar) to fire bullets at enemies  
- Enemy spawning from top of screen — they move downwards towards the player  
- Power-ups:
  - **Rapid Fire**: temporarily reduces cooldown between shots  
  - **Heal**: restores one life (up to a certain limit)  
- Lives system: player has limited lives. If enemies reach bottom or collide with the player, lives are lost  
- Level progression: every few enemies or a threshold score increases the level, which increases difficulty (speed, spawn rate)  
- Heads-Up Display (HUD): shows current score, level, lives, and active power-ups  
- Pause (key “P”) and restart (key “R”) functionality

---

### Controls

| Action        | Key(s)              |
|----------------|------------------------|
| Move Left       | Arrow Left / “A”     |
| Move Right      | Arrow Right / “D”    |
| Move Up         | Arrow Up / “W”       |
| Move Down       | Arrow Down / “S”     |
| Shoot            | Space Bar            |
| Pause / Unpause | “P”                  |
| Restart         | “R”                  |

---

### File Structure / How It’s Built

- `main.lua` – Main file containing game loop, rendering, update logic, collision detection, power-ups, and spawning.  
- No external assets currently (using basic shapes for player, enemies, bullets, power-ups). This keeps things simple, though it’s easy to replace with sprites later.  
- Game configuration constants defined at top (window size, speeds, spawn intervals, etc.) to allow easy tweaking.  
- Utility functions include collision detection, clamping position to window, random spawning, etc.  

---

### How to Run

1. Install **LÖVE (Love2D)** — make sure version 11 or newer.  
2. Place your `main.lua` inside a folder named something like `space-shooter`.  
3. Open terminal/command prompt, navigate to the folder containing `space-shooter`.  
4. Run it with the command:  
   ```bash
   love space-shooter
