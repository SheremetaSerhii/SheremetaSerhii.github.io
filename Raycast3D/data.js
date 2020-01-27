"use strict"

const
    O__O = 0,
    WW01 = 1,
    WW02 = 2,
    STRT = 10000;

export const WALL_SIZE = 32;

export const LOOK_ = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

export const LEVEL_DATA = [
    // LEVEL 0
    {
        startLook: LOOK_.UP,
        sizeX: 32,
        sizeY: 32,
        map: [
            // 0    1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 0
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 1
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 2
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 3
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 4
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 5
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 6
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 7
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 8
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 9
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 10
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 11
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 12
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 13
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 14
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, WW02, WW02, WW02, WW02, WW02, WW02, WW02, WW02, O__O], // 15
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, WW02, O__O, WW02, O__O, WW02, O__O, WW02, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 16
            [O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 17
            [O__O, WW02, WW02, WW02, WW02, WW02, WW02, WW02, WW01, O__O, O__O, O__O, WW02, O__O, O__O, O__O, O__O, O__O, WW02, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 17
            [O__O, WW02, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, STRT, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 19
            [O__O, WW02, O__O, WW02, WW02, WW02, WW02, WW02, WW01, O__O, O__O, O__O, WW02, O__O, O__O, O__O, O__O, O__O, WW02, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 20
            [O__O, WW02, O__O, WW02, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 21
            [O__O, WW02, O__O, WW02, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, WW02, O__O, WW02, O__O, WW02, O__O, WW02, O__O, O__O, O__O, WW01, WW02, O__O, O__O, O__O, O__O, O__O, O__O, WW02, O__O], // 22
            [O__O, WW02, O__O, WW02, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, WW02, WW02, WW02, WW02, WW02, WW02, WW02, WW02, O__O], // 23
            [O__O, WW02, O__O, WW02, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 24
            [O__O, WW02, O__O, WW02, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 25
            [WW01, WW01, O__O, WW01, WW01, O__O, O__O, O__O, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 26
            [WW01, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 27
            [WW01, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 28
            [WW01, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 29
            [WW01, O__O, O__O, O__O, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O], // 30
            [WW01, WW01, WW01, WW01, WW01, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O, O__O]  // 31
        ]
    }
];