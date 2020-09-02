import React from 'react';


export default props => {
  console.log(props)
  return <section className="cover">
      {props.children}
  </section>
}
