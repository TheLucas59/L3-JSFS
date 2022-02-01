import Mobile from './Mobile.js';

const PADDLE_IMAGE_PATH = '../images/paddle.png';
export const PADDLE_WIDTH = 27;
export const PADDLE_HEIGHT = 88;
const SHIFT_X = 0;
const SHIFT_Y = 40;

export default class Paddle extends Mobile {

    constructor(x, y, theGame) {
        super(x, y, PADDLE_IMAGE_PATH , SHIFT_X, SHIFT_Y);
        this.theGame = theGame;
    }

    moveUp() {
        if(this.y - SHIFT_Y < 1) {
            this.y = 0;
        }
        else {
            this.y -= SHIFT_Y;
        }
    }

    moveDown() {
        if(this.y + SHIFT_Y > this.theGame.canvas.height - PADDLE_HEIGHT) {
            this.y = this.theGame.canvas.height - PADDLE_HEIGHT;
        }
        else {
            this.y += SHIFT_Y;
        }
    }
}