import React from 'react';
import Button from '@mui/material/Button';

const Test = () => {
    
    return(
        <>
            <h3 id="id-group-label">
  Sandwich Condiments
</h3>
<div role="group" aria-labelledby="id-group-label">
  <ul class="checkboxes">
    <li>
      <div role="checkbox"
           aria-checked="false"
           tabindex="0">
        Lettuce
      </div>
    </li>
    <li>
      <div role="checkbox"
           aria-checked="true"
           tabindex="0">
        Tomato
      </div>
    </li>
    <li>
      <div role="checkbox"
           aria-checked="false"
           tabindex="0">
        Mustard
      </div>
    </li>
    <li>
      <div role="checkbox"
           aria-checked="false"
           tabindex="0">
        Sprouts
      </div>
    </li>
  </ul>
</div>            
        </>
    )
}

export default Test;
