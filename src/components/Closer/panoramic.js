import React from 'react';
import {Scene} from 'aframe-react';

const Panoramic = (props) => {
  const name = props.match.params.name;
  const url = `/panorama/${name}`;
  return (
    <Scene>
        <a-sky src={url} rotation="0 -130 0"></a-sky>
    </Scene>
  )
};

export default Panoramic;