import React, { useState } from 'react';
import Tracklist from './Tracklist';

const Playlist = ({ name, tracks, onRemove, onChangeName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleNameChange = () => {
        onChangeName(newName); // Call the function passed from App.js
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button onClick={handleNameChange}>Save</button>
                </div>
            ) : (
                <h2 onClick={() => setIsEditing(true)}>{name}</h2> // Click to edit
            )}
            <Tracklist tracks={tracks} onRemove={onRemove} isRemoval={true} />
        </div>
    );
};

export default Playlist;
