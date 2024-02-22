// This component displays the instructions
// Technically it is several components (one for each page), nested within one big component
// (there migth be more elegant ways to handle this).

// import external components and methods
import { textStyle, buttonStyle } from './dimensions';
import { useState, useEffect } from 'react';
import { makeMachine } from './CausalRule';
import './Instructions.css';
import Image from './Image';
import { condition, shapeAssignment } from './randomized-parameters';


// the main component
const Instructions = (props) => {

    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    // import colors
    const colors = props.colors;

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        colors: colors
    };



    //the list of pages (add more as you see fit)
    const instructionTrials = [
        <TaskTutorialOne {...tutorialProps} />,
        <TaskTutorialTwo {...tutorialProps} />,
        //<TaskTutorialThree {...tutorialProps} />,
        //<TaskTutorialFour {...tutorialProps} />,
        //<TaskTutorialFive {...tutorialProps} />,
        // etc
    ]
    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

const TaskTutorialOne = (props) => {

    // make sure the participant starts at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleClick = () => {
        props.incrementTrial()
    };

    const r = 30;
    const text = <span>
        <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
        <br></br>
        <p>Thank you for taking part in this study. </p>
        <p>In this experiment, you will investigate simple machines.</p>
        <p>These machines are composed of basic units, called nodes:</p>
    </span>;

    const img1 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'white'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}
         AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'diamond'}/>



    const text2 = <span>
        <p>A node can be in different states: for example this node can be either <span style={{ color: 'orange' }}><b>ON</b></span> or <b>OFF</b>.</p>
    </span>;

    const img2 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'orange'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'diamond'} />

    const img3 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'white'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'diamond'} />





    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>

    return (
        <div style={textStyle}>
            <br></br>
            {text}
            {img1}
            {text2}
            <div className="instContainer" style={{}}>
                {img2}
                {img3}
            </div>
            <br></br>
            {nextPageButton}
            <br></br>
        </div >
    )

}


const TaskTutorialTwo = (props) => {

    // make sure the participant starts at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleClick = () => {
        props.setCurrentPhase("training")
    };

    const r = 30;

    // import colors
    const colors = props.colors;

    // features of each machine we will display here
    const trialContent = condition === 1 ? [
        {'AWired': 1, 
        'BWired': 0,
        'CWired': 0,
        'AState': 1,
        'BState': 0,
        'CState': 0,
        'text': 'someText'
    },
    {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 1,
    'BState': 0,
    'CState': 1,
    'text': 'someText'
     }
    ] :
    [{'AWired': 0, 
    'BWired': 0,
    'CWired': 1,
    'AState': 0,
    'BState': 0,
    'CState': 0,
    'text': 'someText'
    },
    {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 0,
    'BState': 0,
    'CState': 0,
    'text': 'someText'
    }];

    // machine illustrating generation
    const mg = makeMachine(trialContent[0], colors, condition);
    // machine illustrating prevention
    const mp = makeMachine(trialContent[1], colors, condition);

    // compute the shape of the generator and preventor
    const shapeGenerator = condition === 1 ? shapeAssignment[0] : shapeAssignment[1];
    const shapePreventor = condition === 1 ? shapeAssignment[1] : shapeAssignment[0];

    // compute the color of the generator and preventor
    const colorGenerator = condition === 1 ? mg.Acolor : mg.Ccolor;
    const colorPreventor = condition === 1 ? mp.Ccolor : mp.Acolor;

    // text explaining how machines work
    const text1 = <span>
        <p>Nodes can be wired together to form a larger machine.
            The state of the node at the origin of the arrow can influence the state of the node at the end of the arrow. In particular:</p>
        <p>The circle can only be <b><span style={{color: colors.Eon}}>ON</span></b> if it is wired to the {shapeGenerator} and
         the {shapeGenerator} is <b><span style={{color:colorGenerator}}>{colorGenerator}</span></b>.</p>
        <p>The circle is always <b><span style={{color: 'black'}}>OFF</span></b> if it is wired to the {shapePreventor} and
         the {shapePreventor} is <b><span style={{color:colorPreventor}}>{colorPreventor}</span></b>.</p>
        
    </span>;

    // images of the machines
    // generative node
    const img1 = <Image Acolor={mg.Acolor} Bcolor={mg.Bcolor} Ccolor={mg.Ccolor} Ecolor={mg.Ecolor} AWired={mg.AWired} BWired={mg.BWired} CWired={mg.CWired}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={mg.BState} CState={mg.CState} EState={mg.EState}  
        AShape={shapeAssignment[0]} BShape={'circle'} 
        CShape={shapeAssignment[1]} EShape = {'circle'} />

    // preventative node
    const img2 = <Image Acolor={mp.Acolor} Bcolor={mp.Bcolor} Ccolor={mp.Ccolor} Ecolor={mp.Ecolor} AWired={mp.AWired} BWired={mp.BWired} CWired={mp.CWired}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={mp.BState} CState={mp.CState} EState={mp.EState} 
         AShape={shapeAssignment[0]} BShape={'circle'} 
         CShape={shapeAssignment[1]} EShape = {'circle'}/>


    const text2 = <p>We will show you a few more examples in the next two pages.</p>

    // next page button
    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>

    return (
        <div style={textStyle}>
            <br></br>

            {text1}
            {img1}
            {img2}
            {text2}

            {nextPageButton}
            <br></br>
        </div >
    )

}




export default Instructions;