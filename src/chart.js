import Paper from 'paper';
import {Path} from 'paper';
import {Point} from 'paper';
import {Group} from 'paper';
import {PointText} from 'paper';
import Config from './app/Config';

let ground = 460;
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
        this.drawZeroText()
        this.drawXAxis()
        this.drawYAxis()
        this.drawCalculateLine()
    }

    drawZeroText() {
        new PointText({
            point: [padding - 20, ground - 20],
            fillColor: '#78909C',
            justification : 'center',
            content: 0,
        });
    }

    drawCalculateLine() {
        let yScale = 50;
        let xScale = 10;
        let g = ground - 40;
        let path = new Path({
            strokeColor: 'black'
        });
        path.add(new Point(padding, g));
        let sum = 0;
        let avg = 0;
        for (var n = 0; n < 101; n++) {
            var pi = 0;
            for (var k = 1; k < n; k++) {
                pi += ( Math.pow(-1, k+1) / ((2*k)-1) );
            };
            let val = 4 * pi;
            sum += val;
            path.add(new Point(padding + (n * xScale), g - (yScale * val)));
            path.add(new Point(padding + (n * xScale) + xScale, g - (yScale * val)));
            if (n == 100) {
                avg = sum / 100;
                this.drawAvgLine(avg, xScale, yScale);
            }
        };
    }

    drawAvgLine(avg, xScale, yScale) {
        console.log(avg);
        let g = ground - 40;
        let avgScale = g - (avg * yScale);
        new Path.Line({
            from: [padding - 50, avgScale],
            to: [padding + (xScale * 100) + 50, avgScale],
            strokeWidth: 1,
            dashArray: [2, 2],
            strokeCap: 'round',
            strokeColor: '#283593',
        });
    }

    drawYAxis() {
        let w = 50;
        let g = ground - 40;
        for (var i = 0; i < 8; i++) {
            new Path.Line({
                from: [padding, g - (w*i)],
                to: [padding, g - w - (w*i)],
                strokeWidth: 3,
                strokeCap: 'round',
                strokeColor: lineColor,
            });

            new PointText({
                point: [padding - 20, g - w - (w*i)],
                fillColor: '#78909C',
                justification : 'center',
                content: i + 1,
            });

            for (var j = 1; j < 11; j++) {
                let y = g - (i*w) - (j * (w/10));
                let x = (j == 10) ? padding - 10 : padding - 5;
                let strokeWidth = (j == 10) ? 2 : 1;
                new Path.Line({
                    from: [padding, y],
                    to: [x, y],
                    strokeCap: 'round',
                    strokeWidth: strokeWidth,
                    strokeColor: lineColor,
                });
            };
        }
    }

    drawXAxis() {
        let w = 100;
        let g = ground - 40;
        for (var i = 0; i < 10; i++) {
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
                content: (i + 1) * 10,
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
