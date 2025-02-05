import React, { useRef } from "react";
import { useGLTF,useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import '../src/App.css';
import { useNavigate } from "react-router-dom";

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Website Model compressed .glb')
  const { actions } = useAnimations(animations, group)
    // Create a ref for the button
    const button1Ref = useRef();
    const button2Ref = useRef();
    const button3Ref = useRef();
    const button4Ref = useRef();
    const button5Ref = useRef();
    const button6Ref = useRef();
    const button7Ref = useRef();
    const button8Ref = useRef();
    const navigate=useNavigate();

    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      if (button1Ref.current) {
        const scale =0.3 + Math.sin(time * 2) * 0.1; // Scale oscillates between 0.9 and 1.1
        button1Ref.current.scale.set(scale, scale, scale);
      }
      if (button2Ref.current) {
        button2Ref.current.position.y = 1.541 + Math.sin(time) * 0.2; // Base position + floating motion
      }
      if (button3Ref.current) {
        button3Ref.current.position.y = 4.9 + Math.sin(time) * 0.2; // Base position + floating motion
      }
      if (button4Ref.current) {
        button4Ref.current.position.x = 5.34 + Math.sin(time) * 0.1; // Small horizontal drift
        button4Ref.current.position.y = -0.8 + Math.sin(time * 1.5) * 0.2; // Vertical drift
        button4Ref.current.position.z =  -1 + Math.cos(time * 0.7) * 0.4; // Depth drift
      }
      if (button5Ref.current) {
        button5Ref.current.position.y = 0 + Math.sin(time) * 0.2; // Floating up and down
        button5Ref.current.rotation.y += 0.02; // Rotate around the y-axis
      }
      const radius = 0.4; // Radius of the figure-eight
      if (button6Ref.current) {
        button6Ref.current.position.x = -3 + Math.sin(time) * radius;
        button6Ref.current.position.z =4 + Math.sin(time ) * radius; // Double the frequency
        button6Ref.current.position.y = 3; // Keep height constant
  
      }
      if (button7Ref.current) {
        const scale =0.2 + Math.sin(time * 2) * 0.1; // Scale oscillates between 0.9 and 1.1
        button7Ref.current.scale.set(scale, scale, scale);
      }
      if (button8Ref.current) {
        const scale =0.2 + Math.sin(time * 2) * 0.03; // Scale oscillates between 0.9 and 1.1
        button8Ref.current.scale.set(scale, scale, scale);
      }
    });
    const handleHover = (isHovering) => {
      document.body.classList.toggle('custom-cursor', isHovering);
    };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="tree001"
          castShadow
          receiveShadow
          geometry={nodes.tree001.geometry}
          material={materials['baked_tree.002']}
          position={[-0.006, 0, -45.16]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        
        <group
          name="sketchfab"
          position={[3.582, -0.044, 3.568]}
          rotation={[Math.PI / 2, 0, 0.993]}
          scale={0.192}>
          <mesh
            name="sketchfab_1"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_1.geometry}
            material={materials.aiStandardSurface5SG}
          />
          <mesh
            name="sketchfab_2"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_2.geometry}
            material={materials.aiStandardSurface1SG}
          />
          <mesh
            name="sketchfab_3"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_3.geometry}
            material={materials.aiStandardSurface2SG}
          />
          <mesh
            name="sketchfab_4"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_4.geometry}
            material={materials.aiStandardSurface3SG}
          />
          <mesh
            name="sketchfab_5"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_5.geometry}
            material={materials.aiStandardSurface6SG}
          />
          <mesh
            name="sketchfab_6"
            castShadow
            receiveShadow
            geometry={nodes.sketchfab_6.geometry}
            material={materials.initialShadingGroup}
          />
        </group>
        <group
          name="Sketchfab_model"
          position={[-4.003, 3.89, 4.307]}
          rotation={[-1.514, 0.029, 2.087]}
          scale={0.315}>
          <group name="clockfbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="RootNode">
              <group name="clock_low" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="clock_low_T_clock_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.clock_low_T_clock_0.geometry}
                  material={materials.T_clock}
                  position={[-0.499, -0.003, 0.032]}
                />
                <mesh
                  name="clock_low_T_clock_0001"
                  castShadow
                  receiveShadow
                  geometry={nodes.clock_low_T_clock_0001.geometry}
                  material={materials.T_clock}
                  position={[-0.546, -0.949, 1.768]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[4.54, -1.241, -0.76]}
          rotation={[-Math.PI / 2, 0, -0.234]}
          scale={39.863}>
          <group
            name="5c2de9e4292f448ea56b371695c1b651fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="RootNode001">
              <group name="pasted__pCube221">
                <mesh
                  name="pasted__pCube221_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCube221_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group name="pasted__pCube222">
                <mesh
                  name="pasted__pCube222_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCube222_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group name="pasted__pCube223">
                <mesh
                  name="pasted__pCube223_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCube223_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group
                name="pasted__pCylinder2"
                position={[-1.493, 0.033, -1.042]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.036}>
                <mesh
                  name="pasted__pCylinder2_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCylinder2_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group
                name="pasted__pCylinder3"
                position={[-0.309, 1.79, 0.188]}
                rotation={[-Math.PI, 1.309, Math.PI / 2]}
                scale={0.036}>
                <mesh
                  name="pasted__pCylinder3_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCylinder3_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group
                name="pasted__pCylinder4"
                position={[-0.309, 2.94, -0.128]}
                rotation={[-1.309, Math.PI / 2, 0]}
                scale={0.036}>
                <mesh
                  name="pasted__pCylinder4_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCylinder4_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group
                name="pasted__pCylinder5"
                position={[-0.086, 2.931, 0.43]}
                rotation={[-Math.PI, 0, 1.309]}
                scale={0.036}>
                <mesh
                  name="pasted__pCylinder5_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.pasted__pCylinder5_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group name="polySurface10" />
              <group name="polySurface6">
                <mesh
                  name="polySurface6_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.polySurface6_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group name="polySurface7">
                <mesh
                  name="polySurface7_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.polySurface7_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
              <group name="polySurface8">
                <mesh
                  name="polySurface8_lambert1_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.polySurface8_lambert1_0.geometry}
                  material={materials.lambert1}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model002"
          position={[4.631, 0.682, -0.661]}
          rotation={[-Math.PI / 2, 0, 1.306]}
          scale={0.003}>
          <group name="e5f84af1f3c1427b8779bd878ff01757fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode002">
              <group name="Mesh">
                <group name="Mesh_page_0" position={[0, 64.244, 0]}>
                  <mesh
                    name="Mesh_page_0_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_page_0_1.geometry}
                    material={materials.page}
                  />
                  <mesh
                    name="Mesh_page_0_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_page_0_2.geometry}
                    material={materials.default1}
                  />
                </group>
                <mesh
                  name="Mesh_page_0001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0001.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0002"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0002.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0003"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0003.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0004"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0004.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0005"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0005.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0006"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0006.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0007"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0007.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0008"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0008.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0009"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0009.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0010"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0010.geometry}
                  material={materials.page}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0011"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0011.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0012"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0012.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0013"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0013.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
                <mesh
                  name="Mesh_page_0014"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_page_0014.geometry}
                  material={materials.default1}
                  position={[0, 64.244, 0]}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="group7_pasted__sweep9002"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9002.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9004"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9004.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9011"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9011.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9014"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9014.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9016"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9016.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9018"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9018.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9019"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9019.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9020"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9020.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9021"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9021.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9023"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9023.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9025"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9025.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9026"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9026.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9027"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9027.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9028"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9028.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9031"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9031.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9033"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9033.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.M_EmissiveCloud}
          position={[-1.131, 7.911, 6.505]}
          rotation={[1.476, -0.063, 0.586]}
          scale={[2.177, 2.09, 2.177]}
        />
        <mesh
          name="group7_pasted__sweep9"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9005"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9005.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9006"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9006.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9008"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9008.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.143, 7.06, 6.485]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9012"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9012.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9013"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9013.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9015"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9015.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.143, 7.06, 6.485]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9022"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9022.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9029"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9029.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9030"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9030.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9032"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9032.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.143, 7.06, 6.485]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9034"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9034.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.143, 7.06, 6.485]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.021}
        />
        <mesh
          name="group7_pasted__sweep9035"
          castShadow
          receiveShadow
          geometry={nodes.group7_pasted__sweep9035.geometry}
          material={materials.M_Staff_Diffuse}
          position={[-1.168, 7.06, 6.505]}
          rotation={[Math.PI / 2, 0, 0.589]}
          scale={0.021}
        />
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.M_Floating_Particles}
          position={[-2.102, 7.59, 6.297]}
          rotation={[0.946, -0.872, -0.259]}
          scale={[0.955, 0.671, 0.455]}
        />
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials.M_Floating_Particles}
          position={[-2.008, 8.017, 6.319]}
          rotation={[0.936, -0.86, -0.27]}
          scale={[0.534, 1.981, 1.307]}
        />
        <mesh
          name="Plane003"
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials.M_Floating_Particles}
          position={[-1.653, 8.468, 6.274]}
          rotation={[0.954, -0.858, -0.256]}
          scale={[0.709, 0.561, 0.171]}
        />
        <mesh
          name="Plane004"
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.884, 8.629, 6.28]}
          rotation={[-2.174, 0.873, -2.91]}
          scale={[-0.972, -0.527, -0.8]}
        />
        <mesh
          name="Plane005"
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.405, 8.455, 6.437]}
          rotation={[0.956, -0.882, -0.262]}
          scale={[1.022, 0.279, 0.372]}
        />
        <mesh
          name="Plane006"
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.499, 8.226, 6.227]}
          rotation={[0.925, -0.848, -0.281]}
          scale={[0.69, 0.265, 0.142]}
        />
        <mesh
          name="Plane007"
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.757, 7.683, 7.201]}
          rotation={[0.952, -0.866, -0.256]}
          scale={[0.98, 1.932, 0.788]}
        />
        <mesh
          name="Plane008"
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials.M_Floating_Particles}
          position={[-1.216, 7.341, 6.709]}
          rotation={[-2.191, 0.871, -2.878]}
          scale={[-0.566, -0.08, -0.295]}
        />
        <mesh
          name="Plane009"
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials.M_Floating_Particles}
          position={[-2.041, 7.597, 6.13]}
          rotation={[0.913, -0.848, -0.296]}
          scale={[1.066, 1.762, 1.212]}
        />
        <mesh
          name="Plane010"
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={materials.M_Floating_Particles}
          position={[-1.729, 8.5, 5.694]}
          rotation={[0.94, -0.865, -0.281]}
          scale={[1.007, 0.964, 1.286]}
        />
        <mesh
          name="Plane011"
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={materials.M_Floating_Particles}
          position={[-1.533, 8.194, 6.125]}
          rotation={[0.938, -0.847, -0.275]}
          scale={[0.963, 1.023, 0.145]}
        />
        <mesh
          name="Plane012"
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.967, 7.822, 6.789]}
          rotation={[0.965, -0.879, -0.231]}
          scale={[0.511, 0.298, 1.145]}
        />
        <mesh
          name="Plane013"
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials.M_Floating_Particles}
          position={[-1.008, 7.272, 6.36]}
          rotation={[0.952, -0.879, -0.267]}
          scale={[1.055, 1.199, 0.779]}
        />
        <mesh
          name="Plane014"
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.623, 8.017, 6.513]}
          rotation={[0.913, -0.848, -0.296]}
          scale={[1.066, 1.762, 1.212]}
        />
        <mesh
          name="Plane015"
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={materials.M_Floating_Particles}
          position={[-0.968, 8.07, 6.133]}
          rotation={[0.954, -0.858, -0.256]}
          scale={[0.709, 0.561, 0.171]}
        />
        <group
          name="NightElf_MoonStaff_Pose_geo"
          position={[-1.129, 3.519, -3.043]}
          rotation={[1.681, 0.055, 0.065]}
          scale={0.013}>
          <mesh
            name="Mesh001"
            castShadow
            receiveShadow
            geometry={nodes.Mesh001.geometry}
            material={materials.M_Staff}
          />
          <mesh
            name="Mesh001_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh001_1.geometry}
            material={materials.M_Effects}
          />
        </group>
        
        <mesh
          name="foliage"
          castShadow
          receiveShadow
          geometry={nodes.foliage.geometry}
          material={materials.baked_flowers}
          position={[-0.006, 0, 0.003]}
        />
        <mesh
          name="ropes"
          castShadow
          receiveShadow
          geometry={nodes.ropes.geometry}
          material={materials.baked_rope}
          position={[-0.006, 0, 0.003]}
        />
        <mesh
          name="oreada"
          castShadow
          receiveShadow
          geometry={nodes.oreada.geometry}
          material={materials.baked_oreada}
          position={[-0.006, 0, 0.003]}
        />
        <mesh
          name="rocks"
          castShadow
          receiveShadow
          geometry={nodes.rocks.geometry}
          material={materials.baked_rocks}
          position={[-0.006, 0, 0.003]}
        />
        <group  name="Armature" position={[5.436, 1.879, -3.491]}> 
          <primitive object={nodes.Bone} />
        </group>
        <group
          ref={button4Ref}
          onClick={()=> navigate("/event")}
          name="Cube"
          position={[5.104, -0.832, -0.702]}
          rotation={[0, 0.228, 0]}
          scale={[0.155, 0.177, 0.699]}>
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Cube_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
          ref={button2Ref}
          onClick={()=> navigate("/sponsor")}
          
          name="Cube001"
          position={[0.53, 0.633, -4.674]}
          rotation={[0, 0.226, 0]}
          scale={[0.155, 0.177, 0.699]}>
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
          ref={button3Ref}
          onPointerOver={() => handleHover(true)}  // Add custom cursor on hover
          onPointerOut={() => handleHover(false)} // Remove custom cursor when not hovering
          onClick={()=> navigate("/login")}
          name="Cube003"
          position={[-0.631, 3.883, -3.103]}
          rotation={[0, 0.072, 0]}
          scale={[0.12, 0.137, 0.541]}>
          <mesh
            name="Cube004_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Cube004_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_2.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
          ref={button5Ref}
          onClick={()=> navigate("/profile")}
          name="Cube004"
          position={[4.651, -0.524, 3.547]}
          rotation={[0.002, -0.018, -0.016]}
          scale={[0.155, 0.177, 0.699]}>
          <mesh
            name="Cube005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_1.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Cube005_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_2.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
        //schedule page button route
          ref={button6Ref}
          onClick={()=> navigate("/schedule")}
          name="Cube005"
          position={[-3.002, 3.003, 3.989]}
          rotation={[0.019, 0.428, -0.031]}
          scale={[0.155, 0.177, 0.699]}>
          <mesh
            name="Cube006"
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Cube006_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
          ref={button1Ref}
          onClick={()=> navigate("/our_team")}
          name="Text003"
          position={[1.807, 1.534, -0.502]}
          rotation={[1.557, 0.037, -1.643]}
          scale={[0.527, 1.025, 0.21]}>
          <mesh
            name="Text009"
            castShadow
            receiveShadow
            geometry={nodes.Text009.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Text009_1"
            castShadow
            receiveShadow
            geometry={nodes.Text009_1.geometry}
            material={materials['Material.001']}
          />
        </group>
        <group
          ref={button8Ref}
          onClick={()=> navigate("/leaderboard")}
          name="Text"
          position={[-0.164, 6.156, 6]}
          rotation={[Math.PI / 2, 0, -2.162]}
          scale={0.154}>
          <mesh
            name="Text_1"
            castShadow
            receiveShadow
            geometry={nodes.Text_1.geometry}
            material={materials.rock_shine}
          />
          <mesh
            name="Text_2"
            castShadow
            receiveShadow
            geometry={nodes.Text_2.geometry}
            material={materials['Material.001']}
          />
        </group>
        <mesh
          name="oreada001"
          castShadow
          receiveShadow
          geometry={nodes.oreada001.geometry}
          material={materials.baked_oreada}
          position={[-0.006, 0.006, 0.005]}
          rotation={[-0.001, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Website Model compressed .glb')

