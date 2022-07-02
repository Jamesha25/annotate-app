import React from "react";
import { TokenAnnotator } from "react-text-annotate";
import "./annotateApp.css";



class AnnotateApp extends React.Component {
    TEXT = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";
    TAG_COLORS = {
        ORG: "red",
        PERSON: "green"
    };
    state = {
        selectedValues: [],
        value:[],
        tag: "",
        selectedWords: 0,
        showHighlightwords: false,
        xPos: 0,
        yPos: 0,
    };

    handleChange = value => {
        this.setState({ selectedValues: value, selectedWords: value.length });
        if(value.length > this.state.selectedWords){
            this.setState({ showHighlightwords: true, xPos: window.event.clientX, yPos: window.event.clientY });
        }
        else{
            this.setState({ showHighlightwords: false });
            this.setState({ value: value});
        }
    };

    handleHighlightText = text => {
        this.setState({ tag: text, showHighlightwords: false });
        let temp = this.state.selectedValues;
        let lastValue = temp.pop();
        
        const { color, end, start, tokens } = lastValue;
        const modifiedlastValue = {
            color,
            end,
            start,
            tag: text,
            tokens
        }
        temp.push(modifiedlastValue);
        this.setState({ value: temp, selectedValues: temp });
    }

    render() {
        const { showHighlightwords, xPos, yPos, tag } = this.state;
        const tags = Object.keys(this.TAG_COLORS);
        return (
            <div>
                <h3>react-text-annotate</h3>
                <p>A React component for interactively highlighting parts of text.</p>
                <div> 
                    <h4>Custom rendered mark</h4>
                    <TokenAnnotator
                    style={{
                        padding: 20,
                        border: 'solid',
                        lineHeight: 3
                    }}
                    tokens={this.TEXT.split(" ")}
                    value={this.state.value}
                    onChange={this.handleChange}
                    getSpan={span => ({
                        ...span,
                        tag: tag,
                        color: this.TAG_COLORS[tag]
                    })}
                    renderMark={props =>
                        (
                        <mark
                            key={props.key}
                            onClick={() =>{
                                props.onClick({
                                    start: props.start,
                                    end: props.end,
                                    text: props.text,
                                    tag: props.tag,
                                    color: props.color,
                                })
                            }}
                            style={{
                                padding: 5,
                                margin: 3,
                                lineHeight: 1,
                                display: "inline-block",
                                borderRadius: 5,
                                cursor: 'pointer',
                                backgroundColor: this.TAG_COLORS[props.tag]
                            }}
                        >
        
                        <span
                            style={{
                            boxSizing: "border-box",
                            content: "attr(data-entity)",
                            fontSize: 11,
                            lineHeight: 1,
                            padding: 3,
                            margin: 3,
                            borderRadius: 3,
                            textTransform: "uppercase",
                            display: "block",
                            background: "#fff",
                            fontWeight: "700",
                            }}
                        >
                            {" "}
                            {props.tag}
                        </span>
                        {props.content}{" "}
                        </mark>
                    )}
                    />
                </div>
                {showHighlightwords && 
                <div style={{border:'solid', position:'absolute', left: xPos, top: yPos+7, background: 'aliceblue'}}>
                {
                    tags.map((item, ind) => {
                        return(
                            <div key={ind} style={{padding:5, cursor:'pointer'}} onClick={(e) => this.handleHighlightText(item)}>{item}</div>
                        );
                    })
                }
                </div>}
            </div>
        );
    }
}

export default AnnotateApp;