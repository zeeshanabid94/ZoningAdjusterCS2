import React from 'react';

class ZoningAdjusterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoningMode: '',
            isFocused: false
        };
    }

    componentDidMount() {
        this.unsub = updateEventFromCSharp('zoning_adjuster_ui_namespace.zoning_mode', (zoningMode) => {
            console.log(`Zoning mode fetched ${zoningMode}`);
            this.setState({ zoningMode: zoningMode})
        })
    }

    componentWillUnmount() {
        this.unsub();
    }

    selectZoningMode = (zoningMode) => {
        console.log(`Button clicked. Zoning mode ${zoningMode}`);
        sendDataToCSharp('zoning_adjuster_ui_namespace', 'zoning_mode_update', zoningMode);
    }

    renderZoningModeButton(zoningMode, style) {
        return (
            <button 
                style={style}
                onClick={() => this.selectZoningMode(zoningMode)}
            >
            {zoningMode}
            </button>
        );
    }


    render() {
        // Define the styles
        const windowStyle = {
            border: '1px solid #ccc',
            padding: '20px',
            width: '200px',
            margin: '20px auto',
            textAlign: 'center',
            transition: 'box-shadow 0.3s ease-in-out',
            pointerEvents: 'auto'
        };

        const buttonStyle = {
            margin: '5px',
            padding: '10px 20px',
        };

        const leftButtonStyle = {
            ...buttonStyle,
            background: 'linear-gradient(to right, white 55%, gray 45%)',
            border: this.state.zoningMode === 'Left' ? '10px solid green' : 'none',
        }

        const rightButtonStyle = {
            ...buttonStyle,
            background: 'linear-gradient(to right, gray 55%, white 55%)',
            border: this.state.zoningMode === 'Right' ? '10px solid green' : 'none',
        }
                
        const defaultButtonStyle = {
            ...buttonStyle,
            background: 'linear-gradient(to right, white 20%, gray 30%, gray 70%, white 80%)',
            border: this.state.zoningMode === 'Default' ? '10px solid green' : 'none',
        }

        const noneButtonStyle = {
            ...buttonStyle,
            background: 'gray',
            border: this.state.zoningMode === 'None' ? '10px solid green' : 'none',
        }

        // Apply the styles to the elements
        return (
            <div 
                style={windowStyle}
            >
                {this.renderZoningModeButton("Left", leftButtonStyle)}
                {this.renderZoningModeButton("Right", rightButtonStyle)}
                {this.renderZoningModeButton("Default", defaultButtonStyle)}
                {this.renderZoningModeButton("None", noneButtonStyle)}
            </div>
        );
    }

    get_zoning_mode() {
        console.log("Getting zoning mode.");

    }
}

function updateEventFromCSharp(event, callback) {
    console.log("Updating.");
    const updateEvent = event + ".update"
    const subscribeEvent = event + ".subscribe"
    const unsubscribeEvent = event + ".unsubscribe"

    var sub = engine.on(updateEvent, callback)
    engine.trigger(subscribeEvent)
    return () => {
        engine.trigger(unsubscribeEvent)
        sub.clear();
    };
}

function sendDataToCSharp(namespace, event, newValue) {
    console.log("Event triggered.");
    engine.trigger(namespace + "." + event, newValue);
}

export default ZoningAdjusterPanel;