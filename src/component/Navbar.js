import React from 'react';
import './Navbar.css';

function Navbar({ selectedCount, deleteImages }) {
  return (
    <div className='navbar'>
      {selectedCount > 0 ? (
        <div className='nav-selected'>
          <div>{selectedCount} items selected</div>
          <div className="delete" onClick={deleteImages}>Delete files</div>
        </div>
      ) : (
        <div>Gallery</div>
      )}
    </div>
  );
}

export default Navbar;