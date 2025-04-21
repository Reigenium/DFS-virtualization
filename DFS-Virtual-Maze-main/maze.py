import random

ROWS, COLS = 20, 20
exit_cell = (ROWS - 1, COLS - 1)

def generate_maze(difficulty=0.3):
    maze = [[1 if random.random() > difficulty else 0 for _ in range(COLS)] for _ in range(ROWS)]

    maze[exit_cell[0]][exit_cell[1]] = 1
    
    for nx, ny in [(exit_cell[0] - 1, exit_cell[1]), (exit_cell[0], exit_cell[1] - 1)]:
        if 0 <= nx < ROWS and 0 <= ny < COLS:
            maze[nx][ny] = 1

    return maze


def reset_visited():
    return [[False for _ in range(COLS)] for _ in range(ROWS)]

def get_exit_cell():
    return exit_cell