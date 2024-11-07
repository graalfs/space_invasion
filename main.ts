// basic.show_string("Hallo Frida!")
let column = randint(0, 4)
let i = 0
let g = randint(0, 4)
let finished = false
let p = 500
let win = 50
let loss = 30
let good = 0
let bad = 0
let games = 21
function myplot(c: number) {
    
    led.plot(column, 4)
    while (i < 5 && !finished) {
        led.plot(c, i)
        if (column == c && i > 3) {
            basic.clearScreen()
            led.plot(column, 4)
            led.plot(2, 2)
            basic.showIcon(IconNames.Happy)
            basic.pause(1000)
            finished = true
            p -= win
            good += 1
            return
        } else {
            basic.pause(p)
            led.plot(column, 4)
            i += 1
        }
        
    }
    basic.showIcon(IconNames.Sad)
    finished = true
    p += loss
    bad += 1
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    led.unplot(column, 4)
    column -= 1
    if (column < 0) {
        column = 0
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    led.unplot(column, 4)
    column += 1
    if (column > 4) {
        column = 4
    }
    
})
while (games > 0) {
    if (!finished) {
        myplot(g)
        basic.pause(100)
        basic.clearScreen()
        led.plot(column, 4)
        basic.pause(300)
    }
    
    if (finished) {
        i = 0
        g = randint(0, 4)
        finished = false
        basic.pause(10)
    }
    
    games -= 1
}
if (good > bad) {
    basic.showIcon(IconNames.Happy)
    basic.pause(3000)
    basic.showString("Du hast gewonnen! " + good + " von 21")
} else {
    basic.showIcon(IconNames.Angry)
    basic.pause(1000)
    basic.showString("Verloren! " + " nur " + good + " von 21 geschafft.")
}

