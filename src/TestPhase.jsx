// this script controls what happens during the test phase

import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import {
    testItems, questionOrder, shapeAssignment, focalLetters
} from './randomized-parameters';
import { causalRule, giveColors } from './CausalRule';
import Image from './Image';
import Data from './Data';
import Reminder from './Reminder';
import './TestPhase.css';

const TestPhase = (props) => {

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])

    // import the node colors
    const colors = props.colors;

    // initialize the variable storing the participant's response
    const [response, setResponse] = useState(0);
    // the size of a node
    const r = 20;

    // manages what happens when a participant clicks on the next-page button
    const handleClick = () => {

        // stores relevant data to the Data object
        Data.responses.push(
            {
                trialNumber: props.testNumber,
                focalLetter: focalLetter,
                AState: AState,
                BState: BState,
                CState: CState,
                EState: EState,
                AWired: AWired,
                BWired: BWired,
                CWired: CWired,
                condition: props.condition,
                Acolor: Acolor,
                Ccolor: Ccolor,
                response: response,
                
            })
        console.log(Data);
        // increment the trial number so as to go to the next trial
        props.incrementTest(props.testNumber)
    }

    // the header
    const text = <p>This is question {props.testNumber + 1} / {testItems.length}.
    </p>;

    // the button leading to the next page;
    const nextPageButton = <button style={{...buttonStyle, visibility: response===0 ? 'hidden': 'visible' }}
    onClick={() => handleClick()}>Next</button>;

    // import the trial data
    const trialData = testItems[props.testNumber];

    // The states of the exogenous components
    const AState = trialData.AState;
    const BState = trialData.BState;
    const CState = trialData.CState;

    // // whether the components are connected to the machine
    const AWired = trialData.AWired;
    const BWired = trialData.BWired;
    const CWired = trialData.CWired;

    // compute the state of node E
    const EStateNumeric = causalRule(props.condition, AState, BState, CState,
        AWired, BWired, CWired);
    const EState = (EStateNumeric > 0);

    // Give colors to the nodes according to their logical state
    const [Acolor, Bcolor, Ccolor, Ecolor] = giveColors(AState, BState, CState, EState, colors);


    // graphical display of the machine
    const img = <Image
        AWired={AWired} BWired={BWired} CWired={CWired}
        Etext='E' Atext='X' Btext='B' Ctext="Y"
        Acolor={Acolor} Bcolor={Bcolor} Ccolor={Ccolor} Ecolor={Ecolor} r={r}
        AState={AState} BState={BState} CState={CState} EState={EState} 
        AShape={shapeAssignment[0]} BShape={'circle'} CShape={shapeAssignment[1]} EShape = {'circle'} />;

    // fill in variables in the question texts
    // (e.g. if E is on this should say so in the question)
    const Etext = EState ? "on" : "off";
    const EtextColor = EState ? Ecolor : 'black';
    const notEtext = EState ? "off" : "on";
    const notEtextColor = EState ? "black" : colors.Eon;

    // the question text
    const questionText = <p>Below are several possible explanations of why E is {Etext}. Please select
        the one that you think best describes what is happening.</p>

    // select the letter that the question is about
    const focalLetter = focalLetters[props.testNumber];
    const focalColor = focalLetter === 'X' ? Acolor : 
    focalLetter === 'Y' ? Ccolor : NaN;


    // text for the different response options
    const options = [
        <span>{focalLetter} being <span style={{ color: focalColor }}>{focalColor}</span>  <b>causes</b> E to
            be <span style={{ color: EtextColor }}>{Etext}</span></span>,
        <span>{focalLetter} being <span style={{ color: focalColor }}>{focalColor}</span>  <b>allows</b> E to
            be <span style={{ color: EtextColor }}>{Etext}</span></span>,
        <span>{focalLetter} being <span style={{ color: focalColor }}>{focalColor}</span>  <b>prevents</b> E
            from being <span style={{ color: notEtextColor }}>{notEtext}</span></span>,
        <span>{focalLetter} being <span style={{ color: focalColor }}>{focalColor}</span>  <b>makes no difference</b> to the state of E</span>,
    ]

    // this function updates the response variable when the participant selects an option
    const handleQuestion = (e) => {
        setResponse(e.target.value);
    }

    // an array containing the html elements that make up the response form
    // we store them in an array so that we can display them in an arbitrary order
    // (to allow between-participants randomization)
    const inputElements = [
        <>
            <input type="radio" id="cause" name="question" value="cause" className="radio" />
            <label for="cause">{options[0]}</label><br /><br />
        </>,
        <>
            <input type="radio" id="allow" name="question" value="allow" className="radio" />
            <label for="allow">{options[1]}</label><br /><br />
        </>,
        <>
            <input type="radio" id="prevent" name="question" value="prevent" className="radio" />
            <label for="prevent">{options[2]}</label><br /><br />
        </>,
        <>
            <input type="radio" id="nd" name="question" value="nd" className="radio" />
            <label for="nd">{options[3]}</label><br /><br />
        </>

    ]

    // the html multiple-choice response form
    const inputForm = <form onChange={(e) => handleQuestion(e)}>
        {inputElements[questionOrder[0]]}
        {inputElements[questionOrder[1]]}
        {inputElements[questionOrder[2]]}
        {inputElements[questionOrder[3]]}
    </form >


    return (
        <div style={textStyle}>
            {text}
            <div
            >
                {/* a div with pictures of the previous machines */}
                <Reminder condition={props.condition} colors={colors} mode={props.mode} />
            </div>

            <p>Consider the machine below:</p>
            {img}
            {questionText}
            {inputForm}
            {nextPageButton}

            <br></br>
        </div>

    )
}

export default TestPhase;