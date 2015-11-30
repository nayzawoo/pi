import Paper from 'paper';
import {Path} from 'paper';
import {Point} from 'paper';
import {Group} from 'paper';
import Config from './app/Config';

let conf;

/**
 * Application
 */

 class App {
    constructor() {
        let canvas = document.getElementById('canvas');
        let config = new Config();
        conf = (key) => config.get(key);
        this.circleGroup = undefined;
        Paper.setup(canvas);
        this.drawBottomLine();
        this.drawCircleGroup();
        this.animate();
    }

    drawMainCircle() {
        let w = conf('mainRadius');
        let strokeWidth = 5;
        return new Path.Circle({
            center: [w, w],
            radius: w,
            strokeColor: '#d35400',
            strokeWidth: strokeWidth
        });
    }

    drawCircleCenter() {
        let w = conf('mainRadius');
        let strokeWidth = 10;
        return new Path.Circle({
            center: [w, w],
            radius: strokeWidth/2,
            strokeColor: 'black',
            strokeWidth: strokeWidth
        });
    }

    drawCircelArrowLine() {
        let w = conf('mainRadius');
        return new Path.Line({
            from: [w, w],
            to: [w, w*2 - 10],
            strokeWidth: 3,
            strokeColor: 'black'
        });
    }

    drawCircleMark() {
        let w = conf('mainRadius');
        let radius = 10;
        return new Path.Star({
            center: [w , w*2 - radius],
            points: 3,
            radius1: radius/2,
            radius2: radius,
            fillColor: 'black'
        });
    }

    drawCircleGroup() {
        let w = conf('mainRadius');
        this.circleGroup = new Group({
            children: [this.drawMainCircle(), this.drawCircleMark(), this.drawCircleCenter(), this.drawCircelArrowLine()],
            position:  new Point(conf('left_padding') + w ,conf('ground') - w)
        });
    }


    drawBottomLine() {
        let w = conf('mainRadius');
        let strokeWidth = 3;
        let path = new Path.Line({
            // prefix for strokes
            from: [0, conf('ground') ],
            to: [w*8, conf('ground') ],
            strokeWidth: strokeWidth,
            strokeColor: '#e2e2e2'
        });
    }

    draw() {
        Paper.view.draw();
    }

    showUpdate() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        document.getElementById('update').setAttribute("style", "background:" + color);
    }

    animate() {
        let w = conf('mainRadius');
        Paper.view.onFrame = (event) => {
            if (this.circleGroup) {
                // console.log(1);
                this.circleGroup.rotate(10);
            }
        };
    }
}

global.app = new App();
app.draw();