
import './App.css';
import  React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from "three";

import { Canvas, useFrame, useThree} from '@react-three/fiber';
import { OrbitControls,Box, Plane, Stats } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';



const randColor = new THREE.Color().setHex(Math.random()*0xffffff);


const RBox = (props) => {
  const ref = useRef();  
  useFrame(()=>{
    ref.current.rotation.y += 0.01;
  })
  const material = new MeshBasicMaterial();
  // material.color = new THREE.Color(0x0000ff);
  material.color = props.color;
  console.log(props);
  return(
    <Fragment>
      <Box props={props} ref={ref} args={[100,100,100,10,10,10]} material={material} onClick={props.onClick} position={[(Math.random()-0.5)*1000,(Math.random()-0.5)*1000,(Math.random()-0.5)*1000]}  />
    </Fragment>
  );
};


const Ground = (props) => {
  const ref = useRef();

  useEffect(() =>{
    ref.current.rotation.x = -Math.PI*0.5;
  },[])


  const material = new MeshBasicMaterial();
  material.color = new THREE.Color(0xabcdef);
  return (
    <Fragment>
      <Plane 
        props={props} 
        ref={ref} 
        args={[1000,1000,2,2]} 
        position = {[0,-100,0]} 
        material={material} />
    </Fragment>
  )
}

const ClickableGround = (props) => {
  const ref = useRef();
  
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    setItems(state => [...state,{ color: randColor}]);
    //const interval = setInterval(() => setItems(states => [...states,{ color: randColor.setHex(Math.random()*0xffffff) }]),1000)
    //return () => clearInterval(interval)
  },[])


  const handleClick = useCallback(e => {
    console.log('click');
    setItems( states => {console.log(states);return [...states,{ color: randColor.setHex(Math.random()*0xffffff) }]})
  }, [])


  return( 
    <Fragment>
      <Ground />
      { items.map((boxprops, i) => (<RBox key={i} onClick={handleClick} {...boxprops} /> ) )}      
    </Fragment>
  )
    

}



function App() {
  

  return (
    <Fragment>
    <Canvas
      id="test-canvas"
      dpr={window.devicePixelRatio}
      shadows={{type:"ShawdowMap"}}
      colormanagment="true"
      shadowmap="true"
      camera={{ position: [1000, 1200, 5], fov: 50,far:2000}}>

      <OrbitControls
        attach="orbitControls"
        minDistance={100}
        maxDistance={1500}
        enablePan={false}  />

      <pointLight position={[0, 300, 0]}
                  castShadow
                  shadow-mapSize-height={2048}
                  shadow-mapSize-width={2048}
                  shadow-camera-near={0.1}
                  shadow-camera-far={1000}
                  shadow-camera-right={1000}
                  shadow-camera-left={-1000}
                  shadow-camera-top={1000}
                  shadow-camera-bottom={-1000}/>
      {/* <RBox />
      <Ground /> */}
      <ClickableGround />
      <Stats />
      
    </Canvas>
    </Fragment>
)};


export default App;
