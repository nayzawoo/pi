import Config from './app/Config';
import CircleCanvas from './circle';
import ChartCanvas from './chart';
import Paper from 'paper';

(new CircleCanvas(new Paper.PaperScope())).draw();
// (new ChartCanvas(new Paper.PaperScope())).draw();