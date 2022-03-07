import Mobile from './Mobile.js';
import { BALL_WIDTH } from './Ball.js';
import { BALL_HEIGHT } from './Ball.js';

const PADDLE_IMAGE_PATH = './images/paddle.png';
export const PADDLE_WIDTH = 27;
export const PADDLE_HEIGHT = 88;
const SHIFT_X = 0;
const SHIFT_Y = 10;
const MoveState = { UP : 0, DOWN : 1, NONE : 2};

export default class Paddle extends Mobile {

    SEGMENTS = 6;

    constructor(x, y, theGame, score) {
        super(x, y, PADDLE_IMAGE_PATH , SHIFT_X, SHIFT_Y);
        this.theGame = theGame;
        this.moving = MoveState.NONE;
        this.score = score;
    }

    moveUp() {
        this.moving = MoveState.UP
    }

    moveDown() {
        this.moving = MoveState.DOWN
    }

    move() {
        if (this.moving === MoveState.UP) {
          this.y = Math.max(0, this.y - SHIFT_Y);
        }
        if (this.moving === MoveState.DOWN) {
          this.y = Math.min(this.theGame.canvas.height - PADDLE_HEIGHT, this.y + SHIFT_Y);
        }
    }

    stopMoving() {
        this.moving = MoveState.NONE
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