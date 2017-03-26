import React from 'react';
// import {Scene} from 'aframe-react';

const Panoramic = (props) => {
  const name = props.match.params.name;
  const url = `/panorama/${name}`;
  return (
    <a-scene>
        <a-sky src={url} rotation="0 -130 0"></a-sky>
    </a-scene>
  )
};

export default Panoramic;