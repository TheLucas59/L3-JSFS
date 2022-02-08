import Mobile from './Mobile.js';
import { BALL_WIDTH } from './Ball.js';
import { BALL_HEIGHT } from './Ball.js';

const PADDLE_IMAGE_PATH = '../images/paddle.png';
export const PADDLE_WIDTH = 27;
export const PADDLE_HEIGHT = 88;
const SHIFT_X = 0;
const SHIFT_Y = 40;

export default class Paddle extends Mobile {

    SEGMENTS = 10;

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

    whichSegment(ballY) {
        const segmentHeight = PADDLE_HEIGHT / this.SEGMENTS;
        const ballCenterHeight = ballY + (BALL_HEIGHT/2);
        const diffPaddleToBallCenter = ballCenterHeight - this.y;
        const segment = Math.floor(diffPaddleToBallCenter / segmentHeight);
        if(segment < this.SEGMENTS/2) {
            return (this.SEGMENTS/2)-segment;
        }
        else {
            return (this.SEGMENTS/2)+segment;
        }
    }
}