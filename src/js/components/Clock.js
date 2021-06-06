//thenewcode.com/943/An-SVG-Analog-Clock-In-6-Lines-of-JavaScript
// Adapted for React

import React from "react";

import useClock from "../hooks/useClock";

const Clock = ({size = 150, theme = "light"}) => {
    const { hrsRotn, minsRotn, secsRotn } = useClock();
    let fill, stroke;

    if (theme === "dark") {
        fill = "black";
        stroke = "white";
    } else {
        fill = "white";
        stroke = "black";
    }

    const wrapStyle = {width: size, height: size};
    const faceStyle = {strokeWidth: "1px", fill, stroke};
    const handsStyle = {strokeWidth: "1px", fill: "#333", stroke: "#555"};
    const secondsStyle = {strokeWidth: "1px", fill: "#333", stroke: "#f55"};
    
    return (
        <div style={wrapStyle}>
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" style={faceStyle}/>
                <g>
                    <rect 
                        x="48.5" y="12.5" width="5" 
                        height="40" rx="2.5" ry="2.55" 
                        transform={`rotate(${hrsRotn} 50 50)`} 
                        style={handsStyle}/>
                    <rect 
                        x="48" y="12.5" 
                        width="3" height="40" 
                        rx="2" ry="2" 
                        transform={`rotate(${minsRotn} 50 50)`} 
                        style={handsStyle}/>
                    <line 
                        x1="50" y1="50" x2="50" y2="16" 
                        transform={`rotate(${secsRotn} 50 50)`} 
                        style={secondsStyle}/>
                </g>
            </svg>
        </div>
    );
};

export default Clock;
