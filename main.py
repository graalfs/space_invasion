from microbit import *

basic.show_string("Hallo Frida!")

column = randint(0,4)
i = 0
g = randint(0,4)
finished = False
p = 500
win = 50
loss = 30
good = 0
bad = 0
games = 21

def myplot(c :int):
    global column,i, finished, p, good, bad
    led.plot(column,4)

    while (i < 5 and not finished) :
        led.plot(c,i)
        if (column == c and i > 3):
                basic.clear_screen()
                led.plot(column,4)
                led.plot(2,2)
                basic.show_icon(IconNames.HAPPY)
                basic.pause(1000)
                finished = True
                p -= win
                good += 1
                return
        else:
            basic.pause(p)
            led.plot(column, 4)
            i += 1

    basic.show_icon(IconNames.SAD)
    finished = True
    p += loss
    bad += 1

def on_button_pressed_a():
    global column
    led.unplot(column, 4)
    column -= 1
    if column < 0:
        column = 0


def on_button_pressed_b():
    global column
    led.unplot(column, 4)
    column += 1
    if column > 4:
            column = 4

input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

while games > 0:
    if not finished:
        myplot(g)
        basic.pause(100)
        basic.clear_screen()
        led.plot(column, 4)
        basic.pause(300)

    if finished:
        i = 0
        g = randint(0,4)
        finished = False
        basic.pause(10)

    games -= 1

if good > bad:
    basic.show_icon(IconNames.HAPPY)
    basic.pause(3000)
    basic.show_string("Du hast gewonnen! " + good + " von 21")
else:
    basic.show_icon(IconNames.ANGRY)
    basic.pause(1000)
    basic.show_string("Verloren! " + " nur " + good + " von 21 geschafft.")

