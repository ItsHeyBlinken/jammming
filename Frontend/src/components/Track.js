import React from 'react';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    return (
        <div>
            <h3>{track.name}</h3>
            <p>{track.artist}</p>
            <p>{track.album}</p>
            {isRemoval ? (
                <button onClick={() => onRemove(track)}>-</button>
            ) : (
                <button onClick={() => onAdd(track)}>+</button>
            )}
        </div>
    );
};

export default Track;
