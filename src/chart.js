import Paper from 'paper';
import {Path} from 'paper';
import {Point} from 'paper';
import {Group} from 'paper';
import {PointText} from 'paper';
import Config from './app/Config';

let ground = 300;
let lineColor = '#CFD8DC';
let padding = 30;

/**
 * Application
 */

 class ChartCanvas {

    constructor() {
        let canvas = document.getElementById('chart');
        Paper.setup(canvas);
        this.drawXY();
        this.animate();
    }

    drawXY() {
        this.drawXAxis()
    }

    drawXAxis() {
        let w = 100;
        let g = ground - 40;
        for (var i = 0; i < 5; i++) {
            new Path.Line({
                from: [padding + (i*w), g],
                to: [padding + (i*w) + w, g],
                strokeWidth: 3,
                strokeCap: 'round',
                strokeColor: lineColor,
            });

            var text = new PointText({
                point: [padding + (i*w) + w, g + 25],
                fillColor: '#78909C',
                justification : 'center',
                content: i * 10,
            });

            for (var j = 1; j < 11; j++) {
                let x = padding + (i*w) + (j * (w/10));
                let to = (j == 10) ? [x, g + 10] : [x, g + 5];
                let strokeWidth = (j == 10) ? 2 : 1;
                new Path.Line({
                    from: [x, g],
                    to: to,
                    strokeCap: 'round',
                    strokeWidth: strokeWidth,
                    strokeColor: lineColor,
                });
            };
        }
    }

    animate() {
        let t = 0;
        Paper.view.onFrame = (event) => {
            t++;
        }
    }

    draw() {
        Paper.view.draw();
    }

    randomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}


export default ChartCanvas;
