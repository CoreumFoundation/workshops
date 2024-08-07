/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef,forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Model = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('/logovar2.glb')
  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[1.902, 0, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_2001.geometry}
          material={materials.green}
          position={[-201.299, 4.074, 26.703]}
          rotation={[0, 0, 2.269]}
          scale={0.524}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_3001.geometry}
          material={materials.green}
          position={[-201.299, 4.197, 26.703]}
          scale={0.312}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse001.geometry}
          material={materials['Material.002']}
          position={[-201.299, 4.197, 9.19]}
          scale={0.529}
        />
      </group>
    </group>
  )
});
export default Model;
useGLTF.preload('/logovar2.glb')
