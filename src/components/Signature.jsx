import React from 'react';

const Signature = () => {
    return (
        <div style={{position: 'absolute', right: '20%' }}>
            <span style={{position: 'relative', right: '-20%', fontSize: 10, color: '#444444',  backgroundColor: '#d5d5d3b9', padding: '2px 5px'}}>Google Maps Viewer © 2020 Developed by <a href='https://linkedin.com/in/itsabdulmajid' target="_blank" rel='noopener noreferrer'>Abdulmajid. </a>
                <span>Credits: <a href='https://github.com/tomchentw/react-google-maps' target="_blank" rel='noopener noreferrer'>1</a>, <a href='https://github.com/facebook/react' target="_blank" rel='noopener noreferrer'>2</a>
                </span>                        
            </span>
        </div>
    )
}

export default Signature;