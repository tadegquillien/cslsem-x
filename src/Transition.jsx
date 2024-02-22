import { textStyle, buttonStyle } from './dimensions';


// this component handles transitions between different parts of the experiment.
// It displays different messages depending on the context in which it is called
// the 'context' variable controls this

const Transition = (props) => {

    const handleClick = () => {
        if (props.context === 'internal') {
            props.setCurrentPhase("test")
        }
        if (props.context === 'internal2') {
            props.setCurrentPhase('test2')
        }
        if (props.context === 'external') {
            props.setCurrentPhase('training2')
        }
    }


    const text = (props.context === 'internal' | props.context === 'internal2') ?
        <span>
            <p>Now that you know how this type of machine works, we will ask you some questions.</p>
            <p>You will be able to directly see whether the node at the bottom is on or off, and we will ask you what is a good explanation for why it is in that state.</p>
        </span>
        :

        <span>
            <p>You have now completed half of the experiment.</p>
            <p>Now we will show you machines of a different type than the ones you saw before (as you will see, their nodes have different shapes). <b>The
                rules that determine how these machines work might be different than for the machines that you saw before.</b></p>
            <p>The procedure will be the same as before. First we will give you information about the machines and ask you to make predictions, and later we will ask you to select explanations.</p>
        </span>

    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {text}
            {nextPageButton}
            <br></br>
        </div>

    )
}

export default Transition;