import {AET} from "./lib";
import * as path from "path";

var project = AET.init(path.join(__dirname, '..', 'test-project'), 'test-project');
project.use('nf/60sec');
