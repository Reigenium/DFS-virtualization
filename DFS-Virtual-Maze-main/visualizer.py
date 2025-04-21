import pygame
import time

TILE_SIZE = 30
GRAY = (200, 200, 200)
YELLOW = (255, 255, 0)
ORANGE = (255, 165, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
RED = (255, 0, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

step_sound = pygame.mixer.Sound("assets/step.wav")
found_sound = pygame.mixer.Sound("assets/found.wav")
reverse_sound = pygame.mixer.Sound("assets/reback.wav")

def draw_maze(win, maze, exit_cell, steps_taken):
    win.fill(BLACK)
    for row in range(len(maze)):
        for col in range(len(maze[0])):
            color = WHITE if maze[row][col] == 1 else BLACK
            pygame.draw.rect(win, color, (col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE))
            pygame.draw.rect(win, GRAY, (col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE), 1)
    pygame.draw.rect(win, GREEN, (exit_cell[1] * TILE_SIZE, exit_cell[0] * TILE_SIZE, TILE_SIZE, TILE_SIZE))

    font = pygame.font.SysFont(None, TILE_SIZE)
    text = font.render("Steps: " + str(steps_taken), True, WHITE)
    win.blit(text, (610, 50))
    pygame.display.update()

def play_sound(sound):
    sound.stop()
    sound.play()

def draw_cell(win, x, y, color):
    pygame.draw.rect(win, color, (y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE))
    pygame.draw.rect(win, GRAY, (y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE), 1)
    pygame.display.update()

def draw_buttons(win):
    pygame.draw.rect(win, (100, 100, 255), (610, 100, 180, 40))  # Reset
    pygame.draw.rect(win, (100, 255, 100), (610, 150, 180, 40))  # New Maze

    pygame.draw.rect(win, (0, 150, 255), (610, 250, 180, 30))    # Easy
    pygame.draw.rect(win, (255, 200, 0), (610, 290, 180, 30))    # Medium
    pygame.draw.rect(win, (255, 80, 80), (610, 330, 180, 30))    # Hard

    font = pygame.font.SysFont(None, 30)
    win.blit(font.render("Restart (R)", True, (0, 0, 0)), (620, 110))
    win.blit(font.render("New Maze (N)", True, (0, 0, 0)), (620, 160))

    win.blit(font.render("Easy (1)", True, (0, 0, 0)), (620, 255))
    win.blit(font.render("Medium (2)", True, (0, 0, 0)), (620, 295))
    win.blit(font.render("Hard (3)", True, (0, 0, 0)), (620, 335))
