// this component is used during the Test phase, and displays the
// different types of machines the participant saw during the Training phase

import {
    shapeAssignment, testMachines
} from "./randomized-parameters";
import { giveColors, causalRule } from "./CausalRule";
import Image from "./Image";
import './TestPhase.css';

const Reminder = (props) => {

    // import node colors
    const colors = props.colors;
    // the size of a node
    let r_reminder = 15;

    const machines = testMachines;


    // compute color assignments for all machines
    // (this creates an array of arrays, where each array contains the colors for one machine)
    const nodeColors = machines.map((a) => {
        let c = giveColors(a.AState, a.BState, a.CState,
            causalRule(props.condition, a.AState, a.BState, a.CState,
                a.AWired, a.BWired, a.CWired), colors);
        return (c)
    });

    // create an svg for each machine
    const images = [0, 1, 2, 3, 4, 5].map((i) => {
        return (
            <Image
                AWired={machines[i].AWired} BWired={machines[i].BWired} CWired={machines[i].CWired} Etext=''
                Acolor={nodeColors[i][0]} Bcolor={nodeColors[i][1]} Ccolor={nodeColors[i][2]}
                Ecolor={nodeColors[i][3]} r={r_reminder}
                AState={machines[i].AState} BState={machines[i].AState}
                CState={machines[i].AState} EState={machines[i].AState} 
                AShape={shapeAssignment[0]} BShape={'circle'} CShape={shapeAssignment[1]} EShape = {'circle'}/>
        )
    });


    // return a div
    return (<div className="reminderContainer">

        <div className="reminderText">
            <p>As a reminder, here are some of the different types of observation you made before:</p>

        </div>
        <div className="reminderNodes">

            <span className='reminderContained2'> {images[0]} </span>
            <span className='reminderContained2'> {images[1]} </span>
            <span className='reminderContained2'> {images[2]} </span>
            <span className='reminderContained2'> {images[3]} </span>
            <span className='reminderContained2'> {images[4]} </span>
            <span className='reminderContained2'> {images[5]} </span>
        </div>


    </div>);
};

export default Reminder;