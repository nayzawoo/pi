import {extend} from 'lodash';
const radius = 80;
const diameter = 2 * radius;
const padding = 10;
const ground = 200;
const tempCirclesColor = '#bdc3c7';
const el = document.getElementById('circle');

/**
 * Application
 */

 class CircleCanvas {
    constructor(paper) {
        this.paper = paper;
        this.paper.setup(el);
        this.paper.activate();
        this.restart();
        this.animate();
    }

    showGuidesAndCircles() {
        for (var i = 0; i < 5; i++) {
            this.showGuidesAndCirclesDelay(i);
        }
    }

    showGuidesAndCirclesDelay(n) {
        setTimeout(() => {
            if (n < 1) return;
            this.drawTempCircle(n);
        }, n*200 );
    }

    restart() {
        console.log('reset');
        this.animateEnabled = false;
        this.tempCircles = [];
        this.paper.project.activeLayer.removeChildren();
        this.showGuidesAndCircles();
        this.drawBottomLine();
        this.drawRulerGroup(); 
    }

    hideTempCircles() {
        for (var i = 0; i < this.tempCircles.length; i++) {
            this.tempCircles[i].visible = false;
        }
    }

    drawTempCircle(n) {
        let strokeWidth = 2;
        let xZero = padding + radius;
        let yTop = ground - diameter;
        let g = ground - 2;
        let textDefault = {
            fillColor: '#2980b9',
            fontSize : 23,
            fontWeight: 'bold',
            fontFamily: 'Helvetica',
            justification : 'center',
        };
        let lineDefault = {
            strokeColor: tempCirclesColor,
            strokeWidth: strokeWidth,
        };
        let circle = new this.paper.Path.Circle({
            center: [diameter + padding + diameter*(n-1), g - radius],
            radius: radius,
            strokeColor: tempCirclesColor,
            strokeWidth: strokeWidth,
        });

        // store to hide
        this.tempCircles.push(circle);
        
        new this.paper.Path.Line(extend(lineDefault, {
            from: [xZero + diameter*(n), yTop],
            to: [xZero + diameter*(n),  g],
        }));

        new this.paper.PointText(extend(textDefault, {
            point: [xZero + diameter*(n), yTop - 10],
            content: n,
        }));

        // Last (to triger animation)
        if (n == 4) {
            setTimeout(() => {
                this.hideTempCircles();
                this.drawCircleGroup();
                this.animateEnabled = true;
            }, 500);
        }
        // Only For the first circle
        if (n > 1) {
            return;
        }

        new this.paper.Path.Line(extend(lineDefault, {
            from: [xZero + diameter*(n-1), yTop],
            to: [xZero + diameter*(n-1),  g],
            strokeColor: tempCirclesColor,
        }));

        new this.paper.PointText(extend(textDefault, {
            point: [xZero + diameter*(n-1), yTop - 10],
            content: 0,
        }));
    }

    drawMainCircle() {
        let strokeWidth = 5;
        return new this.paper.Path.Circle({
            center: [radius, radius],
            radius: radius,
            strokeColor: '#d35400',
            strokeWidth: strokeWidth
        });
    }

    drawCircleCenter() {
        let strokeWidth = 10;
        return new this.paper.Path.Circle({
            center: [radius, radius],
            radius: strokeWidth/2,
            strokeColor: 'black',
            strokeWidth: strokeWidth
        });
    }

    drawIndexMark() {
        for (let i = 1; i < 5; i++) {
            let text = new this.paper.PointText({
                point: [diameter*(i-1)+padding+radius, ground + 15],
                fillColor: '#78909C',
                justification : 'center',
                content: i - 1 + 'm',
            });
        }
    }

    drawCircelArrowLine() {
        return new this.paper.Path.Line({
            from: [radius, radius],
            to: [radius, radius*2 - 10],
            strokeWidth: 3,
            strokeColor: 'black'
        });
    }

    drawCircleMark() {
        let starRadius = 10;
        return new this.paper.Path.Star({
            center: [radius , diameter - starRadius],
            points: 3,
            radius1: starRadius/2,
            radius2: starRadius,
            fillColor: 'black'
        });
    }


    drawCircleGroup() {
        this.circleGroup = new this.paper.Group({
            children: [
                this.drawMainCircle(), // Circle
                this.drawCircleMark(), // Arrow Top
                this.drawCircelArrowLine(), // Arrow Line
                this.drawCircleCenter(), // Center Point
                ],
                position:  new this.paper.Point(radius + padding ,ground - radius)
            });
    }

    drawRulerGroup() {
        this.rulerGroup = new this.paper.Group({
            children: [
                this.drawRuler(),
                this.drawRulerMark(),
                this.drawPointText(),
            ],
            position:  new this.paper.Point(padding + radius, ground)
        });
    }

    drawRulerMark() {
        let starRadius = 10;
        let point = new this.paper.Path.Star({
            center: [-2 , ground - 133],
            points: 3,
            radius1: starRadius/2,
            radius2: starRadius,
            fillColor: '#1565C0',
        });
        point.rotate(60);
        return point;
    }

    drawRuler() {
        return new this.paper.Path.Line({
            from: [0, -10],
            to: [0,  ground/2],
            strokeColor: '#1565C0',
            dashArray: [4, 4],
        });
    }

    drawPointText() {
        this.pointText = new this.paper.PointText({
            point: [0, ground/2 + 20],
            content: '0',
            fillColor: '#455A64',
            justification : 'center',
            fontFamily: 'Helvetica',
            fontSize: 18,
        });
        return this.pointText;
    }

    drawBottomLine() {
        let strokeWidth = 3;
        let path = new this.paper.Path.Line({
            from: [30, ground],
            to: [diameter*4, ground],
            strokeWidth: strokeWidth,
            strokeColor: '#e2e2e2',
        });
        this.drawBottomLinePaths();
        // this.drawIndexMark();
    }

    drawBottomLinePaths() {
        let strokeWidth = 3;
        for (let i = 1; i < 5; i++) {
            let path = new this.paper.Path.Line({
                from: [diameter*(i-1)+padding+radius, ground],
                to: [diameter*i+padding+radius, ground],
                strokeWidth: strokeWidth,
                strokeCap: 'square',
                strokeColor: this.randomColor(),
            });
        }
    }

    draw() {
        this.paper.view.draw();
    }

    randomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    drawPiText() {
        new this.paper.PointText({
            point: [padding + radius + diameter*Math.PI, ground - 80],
            content: 'π',
            fillColor: '#222222',
            justification : 'center',
            fontFamily: 'Helvetica',
            fontWeight: 'bold',
            fontSize: 23,
            // visible: false,
        });
    }

    animate() {
        let t = -100;
        let x = 0;
        let angle = 2;
        let tAngle = 0;
        // let movementUnit = 2*Math.PI*radius*(angle/360);
        let movementUnit = (angle * Math.PI/180) * radius;
        const originalX = radius + padding;
        this.paper.view.onFrame = (event) => {
            if (!this.animateEnabled)  {
                x = 0; t = -100;
                return;
            }

            tAngle = t*angle;
            if (0 < tAngle) {
                this.circleGroup.rotate(angle);
                this.circleGroup.position.x += movementUnit;
                if (tAngle <= 360) {
                    x = ((tAngle)*(Math.PI*diameter/360));
                    this.rulerGroup.position.x += movementUnit;
                    this.pointText.content = x/(diameter);
                    if (tAngle == 360) {
                        this.drawPiText();
                    }
                } else {
                    this.circleGroup.opacity = 1.5/(tAngle-360);
                    if(tAngle > 750) {
                        this.restart();
                    }
                }
            }

            t++;
        };
    }
}


export default CircleCanvas;
