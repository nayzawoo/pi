import Paper from 'paper';
import {Path} from 'paper';
import {Point} from 'paper';
import {Group} from 'paper';
import {PointText} from 'paper';
import Config from './app/Config';

let conf;

/**
 * Application
 */

 class CircleCanvas {
    constructor() {
        let canvas = document.getElementById('circle');
        let config = new Config();
        conf = (key) => config.get(key);
        this.circleGroup = undefined;
        Paper.setup(canvas);
        this.drawBottomLine();
        this.drawCircleGroup();
        this.drawRulerGroup();
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

    drawIndexMark() {
        let ground = conf('ground');
        let w = conf('mainRadius');
        let padding = conf('left_padding');
        for (var i = 1; i < 5; i++) {
            var text = new PointText({
                point: [w*2*(i-1)+padding+w, ground + 15],
                fillColor: '#78909C',
                justification : 'center',
                content: i - 1 + 'm',
            });
        }
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

        this.drawBottomLinePaths();
    }


    drawCircleGroup() {
        let w = conf('mainRadius');
        this.circleGroup = new Group({
            children: [this.drawMainCircle(), this.drawCircleMark(), this.drawCircleCenter(), this.drawCircelArrowLine()],
            position:  new Point(w + conf('left_padding') ,conf('ground') - w)
        });
    }

    drawRulerGroup() {
        let w = conf('mainRadius');
        let padding = conf('left_padding');
        let ground = conf('ground');
        this.rulerGroup = new Group({
            children: [this.drawRuler(), this.drawPointText()],
            position:  new Point(padding + w, ground)
        });
    }

    drawRuler() {
        let w = conf('mainRadius');
        let padding = conf('left_padding');
        let ground = conf('ground');
        return new Path.Line({
            from: [0, -10],
            to: [0,  ground/2],
            strokeColor: '#1565C0',
            dashArray: [4, 4],
        });
    }

    drawPointText() {
        let w = conf('mainRadius');
        let ground = conf('ground');
        this.pointText = new PointText({
            point: [0, ground/2 + 20],
            content: '0m',
            fillColor: '#455A64',
            justification : 'center',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            fontSize: 18,
        });
        return this.pointText;
        // text.rotate(90);
    }

    drawBottomLine() {
        let w = conf('mainRadius');
        let strokeWidth = 3;
        let ground = conf('ground');
        let path = new Path.Line({
            // prefix for strokes
            from: [0, ground],
            to: [w*8, conf('ground') ],
            strokeWidth: strokeWidth,
            strokeColor: '#e2e2e2',
        });
        this.drawBottomLinePaths();
        this.drawIndexMark();
    }

    drawBottomLinePaths() {
        let w = conf('mainRadius');
        let strokeWidth = 3;
        let ground = conf('ground');
        let padding = conf('left_padding');
        for (var i = 1; i < 5; i++) {
            let path = new Path.Line({
                from: [w*2*(i-1)+padding+w, ground],
                to: [w*2*i+padding+w, ground],
                strokeWidth: strokeWidth,
                strokeColor: this.randomColor(),
            });
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

    animate() {
        let w = conf('mainRadius');
        let t = 0;
        let x = 0;
        // position:  new Point(w ,conf('ground') - wI)
        Paper.view.onFrame = (event) => {
            t++;
            if (this.circleGroup && t < 361) {
                this.circleGroup.rotate(1);
                x = ((t)*Math.PI*w/180);
                this.circleGroup.position.x = w + conf('left_padding') + x;
                this.rulerGroup.position.x = w + conf('left_padding') + x;
                this.pointText.content = x/(2*w) + 'm';
            }
        }
    }
}


export default CircleCanvas;
