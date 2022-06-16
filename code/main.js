// import kaboom lib
import { kaboom, GAME_HEIGHT, GAME_WIDTH } from "../config.js";

// initialize kaboom context
kaboom({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    background: [153, 217, 234],
});

function loadSprites(){
    loadSprite("sus", "/../sprites/sus.png")
}

function __init__(){
    loadSprites()
    go("Menu")
}

function addButton(txt, p, h, w, font, f) {
    const btn = add([
        scale(1),
        text(txt, {
            font: font,
            size: h,
            width: w,
        }),
        pos(p),
        area(),
        origin("center"),
        fixed(),
    ])

    btn.onClick(f)

}


scene("Game", () => {
    const SPEED = 420

    var score = 0

    // setup sprites
    const sus = add([
        sprite("sus"),
        pos(120, 80),
        rotate(0),
        origin("center"),
        scale(0.15),
        area(),
        body(),
    ]);

    const map = add([
        rect(width()+5, 48),
	    outline(4),
        rotate(0),
        origin("center"),
        area(),
        pos(GAME_WIDTH/2, GAME_HEIGHT-20),
        solid(),
    ])

    const scoretext = add([
        text("Score: " + score, {
            font:
             "sinko"
        }),
        scale(6),
        origin("center"),
	    pos(GAME_WIDTH/2, 50),
        area(),
        fixed(),
    ])
    
    //updates
    sus.onUpdate(() => {
        camPos(sus.pos)
    })               
    //controls
    onKeyDown("up", () => {
        if (sus.isGrounded()) {
            sus.jump()
        }
    })

    onKeyDown("right", () => {
        sus.move(SPEED, 0)
        sus.flipX(false)
    })

    onKeyDown("left", () => {
        sus.move(-SPEED, 0)
        sus.flipX(true)
    })
})

scene("Menu", () => {
    addButton("Start", vec2(GAME_WIDTH/2, GAME_HEIGHT/2), 48*1.6, 200*1.6, "sinko", () => go("Game"))
})

__init__()
