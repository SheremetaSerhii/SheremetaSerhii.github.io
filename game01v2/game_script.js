const LEVEL_DATA = [
    // LEVEL 0
    {
        color: "#000000",
        items: []
    },
    // LEVEL 1
    {
        color: "#ecc40f",
        items: [
            { x: 195, y: 300, w: 210, h: 310, kind: "road" },
            { x: 405, y: 50, w: 150, h: 400, kind: "road" },
            { x: 99, y: 50, w: 370, h: 100, kind: "road" },
            { x: 40, y: 50, w: 60, h: 100, kind: "finish" }
        ]
    },
    // LEVEL 2
    {
        color: "#be902b",
        items: [
            { x: 40, y: 50, w: 400, h: 100, kind: "road" },
            { x: 360, y: 150, w: 80, h: 150, kind: "road" },
            { x: 40, y: 220, w: 320, h: 80, kind: "road" },
            { x: 40, y: 300, w: 85, h: 300, kind: "road" },
            { x: 125, y: 520, w: 210, h: 80, kind: "road" },
            { x: 335, y: 420, w: 75, h: 180, kind: "road" },
            { x: 410, y: 420, w: 150, h: 70, kind: "road" },
            { x: 495, y: 100, w: 65, h: 320, kind: "road" },
            { x: 495, y: 60, w: 65, h: 40, kind: "finish" }
        ]
    },
    // LEVEL 3
    {
        color: "#919235",
        items: [
            { x: 300, y: 50, w: 260, h: 60, kind: "road" },
            { x: 300, y: 110, w: 55, h: 220, kind: "road" },
            { x: 250, y: 280, w: 50, h: 50, kind: "road" },
            { x: 200, y: 50, w: 50, h: 280, kind: "road" },
            { x: 80, y: 50, w: 120, h: 50, kind: "road" },
            { x: 80, y: 100, w: 45, h: 170, kind: "road" },
            { x: 40, y: 250, w: 45, h: 350, kind: "road" },
            { x: 85, y: 555, w: 475, h: 45, kind: "road" },
            { x: 515, y: 140, w: 45, h: 420, kind: "road" },
            { x: 385, y: 140, w: 130, h: 45, kind: "road" },
            { x: 385, y: 180, w: 45, h: 340, kind: "road" },
            { x: 143, y: 475, w: 245, h: 45, kind: "road" },
            { x: 143, y: 220, w: 40, h: 255, kind: "road" },
            { x: 143, y: 190, w: 40, h: 30, kind: "finish" }
        ]
    },
    // LEVEL 4
    {
        color: "#6d971e",
        items: [
            { x: 110, y: 160, w: 110, h: 110, kind: "road" },
            { x: 60, y: 240, w: 50, h: 250, kind: "road" },
            { x: 60, y: 490, w: 50, h: 25, kind: "trapTrigger", val: "3" },
            { x: 60, y: 515, w: 50, h: 30, kind: "road" },
            { x: 60, y: 545, w: 50, h: 25, kind: "finish" },
            { x: 200, y: 135, w: 11, h: 25, kind: "road" },
            { x: 40, y: 115, w: 171, h: 25, kind: "road" },
            { x: 40, y: 40, w: 25, h: 80, kind: "road" },
            { x: 40, y: 40, w: 255, h: 25, kind: "road" },
            { x: 295, y: 46, w: 15, h: 11, kind: "road" },
            { x: 310, y: 40, w: 260, h: 25, kind: "road" },
            { x: 545, y: 40, w: 25, h: 290, kind: "road" },
            { x: 150, y: 305, w: 400, h: 25, kind: "road" },
            { x: 150, y: 330, w: 18, h: 70, kind: "road" },
            { x: 150, y: 400, w: 410, h: 22, kind: "road" },
            { x: 558, y: 400, w: 12, h: 145, kind: "road" },
            { x: 110, y: 545, w: 460, h: 25, kind: "road" }
        ]
    },
    // LEVEL 5
    {
        color: "#3c8a1d",
        items: [
            { x: 40, y: 540, w: 520, h: 30, kind: "road" },
            { x: 40, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 90, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 140, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 190, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 240, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 290, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 340, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 390, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 440, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 490, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 540, y: 40, w: 20, h: 10, kind: "finish" },
            { x: 90, y: 50, w: 20, h: 100, kind: "road" },
            { x: 240, y: 50, w: 20, h: 210, kind: "road" },
            { x: 290, y: 50, w: 20, h: 130, kind: "road" },
            { x: 440, y: 50, w: 20, h: 160, kind: "road" },
            { x: 540, y: 50, w: 20, h: 230, kind: "road" },
            { x: 90, y: 150, w: 20, h: 20, kind: "trapTrigger", val: "2,12" },
            { x: 240, y: 260, w: 20, h: 20, kind: "trapTrigger", val: "5,13" },
            { x: 290, y: 180, w: 20, h: 20, kind: "trapTrigger", val: "6,14" },
            { x: 440, y: 210, w: 20, h: 20, kind: "trapTrigger", val: "9,15" },
            { x: 540, y: 280, w: 20, h: 20, kind: "trapTrigger", val: "11,16" },
            { x: 40, y: 65, w: 20, h: 475, kind: "road" },
            { x: 140, y: 65, w: 20, h: 475, kind: "road" },
            { x: 190, y: 65, w: 20, h: 475, kind: "road" },
            { x: 340, y: 65, w: 20, h: 475, kind: "road" },
            { x: 490, y: 65, w: 20, h: 475, kind: "road" },
            { x: 40, y: 50, w: 20, h: 15, kind: "trapTrigger", val: "1" },
            { x: 140, y: 50, w: 20, h: 15, kind: "trapTrigger", val: "3" },
            { x: 190, y: 50, w: 20, h: 15, kind: "trapTrigger", val: "4" },
            { x: 340, y: 50, w: 20, h: 15, kind: "trapTrigger", val: "7" },
            { x: 490, y: 50, w: 20, h: 15, kind: "trapTrigger", val: "10" },
            { x: 390, y: 50, w: 20, h: 490, kind: "road" },
            { x: 90, y: 170, w: 20, h: 370, kind: "road" },
            { x: 240, y: 280, w: 20, h: 260, kind: "road" },
            { x: 290, y: 200, w: 20, h: 340, kind: "road" },
            { x: 440, y: 230, w: 20, h: 310, kind: "road" },
            { x: 540, y: 300, w: 20, h: 250, kind: "road" }
        ]
    },
    // LEVEL 6
    {
        color: "#107e35",
        items: [
            { x: 530, y: 555, w: 30, h: 35, kind: "road" },
            { x: 40, y: 200, w: 30, h: 30, kind: "road" },
            { x: 445, y: 390, w: 15, h: 30, kind: "road" },
            { x: 120, y: 570, w: 15, h: 20, kind: "road" },
            { x: 160, y: 570, w: 15, h: 20, kind: "road" },
            { x: 200, y: 570, w: 15, h: 20, kind: "road" },
            { x: 240, y: 570, w: 15, h: 20, kind: "road" },
            { x: 280, y: 570, w: 15, h: 20, kind: "road" },
            { x: 360, y: 570, w: 15, h: 20, kind: "road" },
            { x: 120, y: 590, w: 410, h: 20, kind: "road" },
            { x: 350, y: 30, w: 100, h: 80, kind: "road" },
            { x: 450, y: 80, w: 110, h: 30, kind: "road" },
            { x: 530, y: 110, w: 30, h: 420, kind: "road" },
            { x: 530, y: 530, w: 30, h: 25, kind: "trapTrigger", val: "0" },
            { x: 530, y: 590, w: 30, h: 20, kind: "finish" },
            { x: 40, y: 30, w: 310, h: 30, kind: "road" },
            { x: 40, y: 60, w: 30, h: 120, kind: "road" },
            { x: 40, y: 180, w: 30, h: 20, kind: "trapTrigger", val: "1" },
            { x: 40, y: 230, w: 200, h: 30, kind: "road" },
            { x: 90, y: 96, w: 260, h: 14, kind: "road" },
            { x: 90, y: 128, w: 260, h: 14, kind: "road" },
            { x: 90, y: 160, w: 260, h: 14, kind: "road" },
            { x: 90, y: 192, w: 150, h: 14, kind: "road" },
            { x: 90, y: 109, w: 30, h: 20, kind: "road" },
            { x: 90, y: 173, w: 30, h: 20, kind: "road" },
            { x: 210, y: 206, w: 30, h: 24, kind: "road" },
            { x: 320, y: 141, w: 30, h: 20, kind: "road" },
            { x: 320, y: 141, w: 30, h: 20, kind: "road" },
            { x: 120, y: 260, w: 40, h: 20, kind: "road" },
            { x: 120, y: 280, w: 390, h: 30, kind: "road" },
            { x: 480, y: 310, w: 30, h: 260, kind: "road" },
            { x: 430, y: 430, w: 30, h: 140, kind: "road" },
            { x: 460, y: 530, w: 20, h: 40, kind: "road" },
            { x: 120, y: 420, w: 340, h: 40, kind: "road" },
            { x: 230, y: 310, w: 15, h: 30, kind: "road" },
            { x: 40, y: 330, w: 205, h: 20, kind: "road" },
            { x: 40, y: 350, w: 15, h: 260, kind: "road" },
            { x: 90, y: 375, w: 352, h: 20, kind: "road" },
            { x: 75, y: 375, w: 15, h: 235, kind: "road" },
            { x: 55, y: 580, w: 20, h: 30, kind: "road" },
            { x: 442, y: 375, w: 18, h: 20, kind: "trapTrigger", val: "2" },
            { x: 120, y: 460, w: 15, h: 90, kind: "road" },
            { x: 160, y: 460, w: 15, h: 90, kind: "road" },
            { x: 200, y: 460, w: 15, h: 90, kind: "road" },
            { x: 240, y: 460, w: 15, h: 90, kind: "road" },
            { x: 280, y: 460, w: 15, h: 90, kind: "road" },
            { x: 320, y: 460, w: 15, h: 130, kind: "road" },
            { x: 360, y: 460, w: 15, h: 90, kind: "road" },
            { x: 120, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "3" },
            { x: 160, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "4" },
            { x: 200, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "5" },
            { x: 240, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "6" },
            { x: 280, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "7" },
            { x: 360, y: 550, w: 15, h: 20, kind: "trapTrigger", val: "8" }
        ]
    },
    // LEVEL 7
    {
        color: "#037559",
        items: [
            { x: 510, y: 290, w: 50, h: 320, kind: "road" },
            { x: 510, y: 580, w: 50, h: 30, kind: "finish" },
            { x: 240, y: 200, w: 160, h: 140, kind: "road" },
            { x: 400, y: 290, w: 110, h: 16, kind: "road" },
            { x: 280, y: 65, w: 15, h: 135, kind: "road" },
            { x: 290, y: 65, w: 160, h: 15, kind: "road" },
            { x: 450, y: 30, w: 85, h: 85, kind: "road" },
            { x: 482, y: 62, kind: "circle" },
            { x: 70, y: 245, w: 170, h: 15, kind: "road" },
            { x: 70, y: 125, w: 15, h: 120, kind: "road" },
            { x: 35, y: 40, w: 85, h: 85, kind: "road" },
            { x: 67, y: 72, kind: "circle" },
            { x: 340, y: 340, w: 15, h: 200, kind: "road" },
            { x: 140, y: 525, w: 200, h: 15, kind: "road" },
            { x: 55, y: 490, w: 85, h: 85, kind: "road" },
            { x: 87, y: 522, kind: "circle" }
        ]
    },
    // LEVEL 8
    {
        color: "#06667e",
        items: [
            { x: 295, y: 220, w: 15, h: 40, kind: "road" },
            { x: 310, y: 585, w: 200, h: 10, kind: "road" },
            { x: 510, y: 572, w: 35, h: 35, kind: "road" },
            { x: 516, y: 578, kind: "circle" },
            { x: 40, y: 550, w: 520, h: 60, kind: "road" },
            { x: 40, y: 60, w: 15, h: 490, kind: "road" },
            { x: 40, y: 550, w: 270, h: 15, kind: "road" },
            { x: 40, y: 30, w: 520, h: 30, kind: "road" },
            { x: 290, y: 450, w: 20, h: 145, kind: "road" },
            { x: 220, y: 450, w: 70, h: 15, kind: "road" },
            { x: 220, y: 410, w: 160, h: 15, kind: "road" },
            { x: 310, y: 370, w: 70, h: 15, kind: "road" },
            { x: 295, y: 260, w: 15, h: 125, kind: "road" },
            { x: 220, y: 425, w: 15, h: 25, kind: "road" },
            { x: 365, y: 385, w: 15, h: 25, kind: "road" },
            { x: 295, y: 260, w: 15, h: 10, kind: "finish" },
            { x: 285, y: 185, w: 35, h: 35, kind: "trapTrigger", val: "0" },
            { x: 180, y: 195, w: 250, h: 15, kind: "road" },
            { x: 291, y: 191, kind: "circle" },
            { x: 525, y: 33, kind: "circle" },
            { x: 50, y: 33, kind: "circle" },
            { x: 40, y: 30, w: 520, h: 30, kind: "road" },
            { x: 295, y: 60, w: 15, h: 125, kind: "road" },
            { x: 415, y: 140, w: 15, h: 55, kind: "road" },
            { x: 405, y: 105, w: 35, h: 35, kind: "road" },
            { x: 411, y: 111, kind: "circle" },
            { x: 180, y: 210, w: 15, h: 145, kind: "road" },
            { x: 170, y: 355, w: 35, h: 35, kind: "road" },
            { x: 176, y: 361, kind: "circle" },
            { x: 545, y: 60, w: 15, h: 450, kind: "road" },
            { x: 400, y: 500, w: 145, h: 10, kind: "road" },
            { x: 370, y: 490, w: 30, h: 30, kind: "trapTrigger", val: "4" },
            { x: 505, y: 60, w: 15, h: 400, kind: "road" },
            { x: 450, y: 445, w: 55, h: 15, kind: "road" },
            { x: 435, y: 290, w: 15, h: 170, kind: "road" },
            { x: 425, y: 255, w: 35, h: 35, kind: "road" },
            { x: 431, y: 261, kind: "circle" },
            { x: 70, y: 60, w: 15, h: 450, kind: "road" },
            { x: 85, y: 495, w: 155, h: 15, kind: "road" },
            { x: 240, y: 485, w: 35, h: 35, kind: "road" },
            { x: 246, y: 491, kind: "circle" },
            { x: 105, y: 60, w: 15, h: 400, kind: "road" },
            { x: 140, y: 120, w: 15, h: 340, kind: "road" },
            { x: 120, y: 445, w: 20, h: 15, kind: "road" },
            { x: 155, y: 120, w: 70, h: 15, kind: "road" },
            { x: 225, y: 110, w: 35, h: 35, kind: "road" },
            { x: 231, y: 116, kind: "circle" },
            { x: 290, y: 33, kind: "switch", val: "5,6|21,47" }
        ]
    },
    // LEVEL 9
    {
        color: "#284699",
        items: [
            { x: 200, y: 170, w: 200, h: 15, kind: "road" },
            { x: 291, y: 110, w: 18, h: 60, kind: "road" },
            { x: 30, y: 30, w: 40, h: 40, kind: "road" },
            { x: 530, y: 30, w: 40, h: 40, kind: "road" },
            { x: 30, y: 560, w: 40, h: 40, kind: "road" },
            { x: 530, y: 560, w: 40, h: 40, kind: "road" },
            { x: 38, y: 38, kind: "circle" },
            { x: 538, y: 38, kind: "circle" },
            { x: 38, y: 568, kind: "circle" },
            { x: 538, y: 568, kind: "circle" },
            { x: 30, y: 30, w: 40, h: 40, kind: "road" },
            { x: 530, y: 30, w: 40, h: 40, kind: "road" },
            { x: 30, y: 560, w: 40, h: 40, kind: "road" },
            { x: 530, y: 560, w: 40, h: 40, kind: "road" },
            { x: 30, y: 30, w: 540, h: 15, kind: "road" },
            { x: 30, y: 585, w: 540, h: 15, kind: "road" },
            { x: 555, y: 30, w: 15, h: 560, kind: "road" },
            { x: 30, y: 30, w: 15, h: 470, kind: "road" },
            { x: 30, y: 485, w: 280, h: 15, kind: "road" },
            { x: 294, y: 310, w: 16, h: 175, kind: "road" },
            { x: 260, y: 230, w: 80, h: 80, kind: "road" },
            { x: 280, y: 70, w: 40, h: 40, kind: "road" },
            {
                x: 288, y: 78, kind: "switch",
                val: "0,24,25,26,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63|40,41,42,43,44,45,46,47,48"
            },
            { x: 38, y: 568, kind: "switch", val: "1,21,22,27|23" },
            { x: 200, y: 170, w: 15, h: 180, kind: "road" },
            { x: 385, y: 170, w: 15, h: 180, kind: "road" },
            { x: 200, y: 350, w: 200, h: 15, kind: "road" },
            { x: 260, y: 230, w: 80, h: 80, kind: "trapTrigger", val: "14,15,16,17,18,19,27,33" },
            { x: 288, y: 258, kind: "switch", val: "x|10,11,12,13,34,36,37,38,39" },
            { x: 38, y: 568, kind: "switch", val: "28|29,30,31,32" },
            { x: 538, y: 38, kind: "switch", val: "29|x" },
            { x: 38, y: 38, kind: "switch", val: "30|x" },
            { x: 538, y: 568, kind: "switch", val: "31|x" },
            { x: 530, y: 560, w: 40, h: 40, kind: "road" },
            { x: 290, y: 525, w: 20, h: 35, kind: "road" },
            { x: 290, y: 560, w: 20, h: 20, kind: "finish" },
            { x: 310, y: 525, w: 100, h: 10, kind: "road" },
            { x: 410, y: 430, w: 10, h: 105, kind: "road" },
            { x: 340, y: 430, w: 70, h: 10, kind: "road" },
            { x: 340, y: 365, w: 10, h: 65, kind: "road" }, //#39
            { x: 340, y: 240, w: 120, h: 15, kind: "road" }, //#40
            { x: 445, y: 255, w: 15, h: 280, kind: "road" },
            { x: 485, y: 205, w: 15, h: 330, kind: "road" },
            { x: 200, y: 205, w: 15, h: 230, kind: "road" },
            { x: 120, y: 170, w: 15, h: 265, kind: "road" },
            { x: 200, y: 193, w: 300, h: 15, kind: "road" },
            { x: 120, y: 155, w: 189, h: 15, kind: "road" },
            { x: 135, y: 420, w: 65, h: 15, kind: "road" },
            { x: 460, y: 520, w: 25, h: 15, kind: "road" }, //#48
            { x: 400, y: 340, w: 80, h: 15, kind: "road" },
            { x: 400, y: 220, w: 60, h: 15, kind: "road" },
            { x: 140, y: 200, w: 60, h: 15, kind: "road" },
            { x: 125, y: 200, w: 15, h: 90, kind: "road" },
            { x: 58, y: 275, w: 67, h: 15, kind: "road" },
            { x: 43, y: 70, w: 15, h: 220, kind: "road" },
            { x: 220, y: 365, w: 15, h: 220, kind: "road" },
            { x: 110, y: 570, w: 110, h: 15, kind: "road" },
            { x: 110, y: 350, w: 15, h: 220, kind: "road" },
            { x: 43, y: 350, w: 67, h: 15, kind: "road" },
            { x: 43, y: 365, w: 15, h: 195, kind: "road" },
            { x: 465, y: 355, w: 15, h: 232, kind: "road" },
            { x: 480, y: 572, w: 50, h: 15, kind: "road" },
            { x: 460, y: 42, w: 15, h: 193, kind: "road" },
            { x: 475, y: 42, w: 55, h: 15, kind: "road" },
        ]
    }
];

const
    FINISH_COLOR = "#d61010",
    WIN_COLOR = "#559601",
    LOSE_COLOR = "#c70000",
    CIRCLE_COLOR = "#db4d34",
    SWITCH_COLOR_OFF = "#4e5768",
    SWITCH_COLOR_ON = "#78b8c0",
    GAME_LOSE_ENABLE = true,
    FIRST_LEVEL = 1;

var
    gameField = document.getElementsByTagName("main")[0];
currentLevel = 0,
    circlesCounter = 0,
    finishSquaresList = [],
    gameElements = [];

function setGameElementsListDisplay(list, displayVal) {
    var disappearringRoadsArr;
    if (typeof list == "string") {
        disappearringRoadsArr = list.split(",");
    }
    else {
        disappearringRoadsArr = list;
    }
    for (var i = 0; i < disappearringRoadsArr.length; i++) {
        gameElements[disappearringRoadsArr[i]].style.display = displayVal;
    }
    return true;
}

function turnSwitch(stringList, switchState) {
    var switchStringLists = stringList.split("|");
    var a = switchState === "on";
    var b = !a;
    if (switchStringLists[+a] != "x") {
        setGameElementsListDisplay(switchStringLists[+a], "none");
    }
    if (switchStringLists[+b] != "x") {
        setGameElementsListDisplay(switchStringLists[+b], "inline-block");
    }
    return true;
}

function goToMainScreen(gameState) {
    clearGameElements();
    currentLevel = 0;
    startNewGameButton.style.display = "inline-block";
    endGameText.style.display = "inline-block";
    switch (gameState) {
        case "win":
            endGameText.style.color = WIN_COLOR;
            endGameText.innerText = "YOU WIN!"
            break;
        case "lose":
            endGameText.style.color = LOSE_COLOR;
            endGameText.innerText = "YOU LOSE!"
            break;
        default:
            endGameText.style.display = "none";
            break;
    }
    return true;
}

function clearGameElements() {
    if (gameElements.length > 0) {
        for (var i = 0; i < gameElements.length; i++) {
            gameElements[i].remove();
        }
        gameElements = [];
    }
    return true;
}

function createNewGameElement() {
    newGameElement = document.createElement("section");
    newGameElement.addEventListener("dragenter", gameElementDragEnterEvent, false);
    newGameElement.addEventListener("mousemove", gameElementMouseMoveEvent, false);
    newGameElement.addEventListener("mouseenter", gameElementMouseEnterEvent, false);
    gameField.appendChild(newGameElement);
    return newGameElement;
}

function goToLevel(newLevel) {

    currentLevel = newLevel;
    endGameText.style.display = "none";
    var i,
        currentLevelItems = LEVEL_DATA[currentLevel].items,
        currentLevelColor = LEVEL_DATA[currentLevel].color,
        tempSwitchList = [];
    finishSquaresList = [];
    circlesCounter = 0;
    clearGameElements();

    for (i = 0; i < currentLevelItems.length; i++) {
        gameElements.push(createNewGameElement());
        gameElements[i].style.display = "inline-block";
        gameElements[i].style.left = currentLevelItems[i].x + "px";
        gameElements[i].style.top = currentLevelItems[i].y + "px";
        gameElements[i].style.borderRadius = "0px";
        gameElements[i].style.borderStyle = "none";
        gameElements[i].dataset.kind = currentLevelItems[i].kind;
        gameElements[i].dataset.val = "";
        var readWidthAndHeight = true;
        switch (currentLevelItems[i].kind) {
            case "road":
                gameElements[i].style.backgroundColor = currentLevelColor;
                break;
            case "trapTrigger":
                gameElements[i].style.backgroundColor = currentLevelColor;
                gameElements[i].dataset.val = currentLevelItems[i].val;
                break;
            case "finish":
                gameElements[i].style.backgroundColor = FINISH_COLOR;
                finishSquaresList.push(i);
                break;
            case "switch":
                gameElements[i].style.width = "20px";
                gameElements[i].style.height = "20px";
                gameElements[i].style.borderStyle = "solid";
                gameElements[i].style.borderRadius = "8px";
                gameElements[i].style.backgroundColor = SWITCH_COLOR_OFF;
                gameElements[i].dataset.val = currentLevelItems[i].val;
                gameElements[i].dataset.switchState = "off";
                tempSwitchList.push(gameElements[i]);
                readWidthAndHeight = false;
                break;
            case "circle":
                circlesCounter++;
                gameElements[i].style.width = "20px";
                gameElements[i].style.height = "20px";
                gameElements[i].style.borderStyle = "solid";
                gameElements[i].style.borderRadius = "20px";
                gameElements[i].style.backgroundColor = CIRCLE_COLOR;
                readWidthAndHeight = false;
                break;
        }
        if (readWidthAndHeight) {
            gameElements[i].style.width = currentLevelItems[i].w + "px";
            gameElements[i].style.height = currentLevelItems[i].h + "px";
        }
    }

    if (finishSquaresList.length > 0 && circlesCounter > 0) {
        setGameElementsListDisplay(finishSquaresList, "none");
    }

    if (tempSwitchList.length > 0) {
        for (i = 0; i < tempSwitchList.length; i++) {
            turnSwitch(tempSwitchList[i].dataset.val, tempSwitchList[i].dataset.switchState);
        }
    }

    return true;

}

startNewGameButton.addEventListener("click", function (e) {
    goToLevel(FIRST_LEVEL);
    this.style.display = "none";
    e.stopPropagation();
}, false);

if (GAME_LOSE_ENABLE) {
    gameField.addEventListener("mousemove", function () {
        if (currentLevel > 0) {
            goToMainScreen("lose");
        }
    }, false);
}


function gameElementDragEnterEvent() {
    goToMainScreen("lose");
}

function gameElementMouseMoveEvent(e) {
    e.stopPropagation();
}

function gameElementMouseEnterEvent(e) {
    if (this.dataset.kind != "road") {
        switch (this.dataset.kind) {
            case "trapTrigger":
                setGameElementsListDisplay(this.dataset.val, "none");
                break;
            case "finish":
                var nextLevel = currentLevel + 1;
                if (nextLevel < LEVEL_DATA.length) {
                    goToLevel(nextLevel);
                }
                else {
                    goToMainScreen("win");
                }
                break;
            case "switch":
                if (this.dataset.switchState == "on") {
                    this.style.backgroundColor = SWITCH_COLOR_OFF;
                    this.dataset.switchState = "off";
                }
                else {
                    this.style.backgroundColor = SWITCH_COLOR_ON;
                    this.dataset.switchState = "on";
                }
                turnSwitch(this.dataset.val, this.dataset.switchState);
                break;
            case "circle":
                this.style.display = "none";
                circlesCounter--;
                if (circlesCounter <= 0) {
                    setGameElementsListDisplay(finishSquaresList, "inline-block");
                }
                break;
        }
    }
    e.stopPropagation();
}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

document.addEventListener("selectstart", function (e) {
    e.preventDefault();
}, false);