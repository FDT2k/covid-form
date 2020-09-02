import React from 'react';



export default props => {
  <article>
    <h4>Key pair generated</h4>
    <p>Click on the button below to create a backup of your keys. Keep them somewhere safe and secure. Like an external drive or just print the file and keep it in a safe<br/>
      You won't be able to do it after this step</p>
    <button onClick={props.onClick}>save them</button>
  </article>
}
