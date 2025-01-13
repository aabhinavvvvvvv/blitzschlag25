import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ScrollControls, Environment, OrbitControls } from "@react-three/drei";
import Model from "../../public/Model";
import Loader from "../Components/modelLoader";
import bgformobile from "/bg3d.jpg";

export default function Model3D() {
  const [isLoading, setIsLoading] = useState(true);

  const getCameraSettings = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return { position: [8, 4, 0], fov: 110 };
    }
    return { position: [13, 6, 0], fov: 65 };
  };

  const getEnvironmentFile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return `${bgformobile}`; // Replace with your fallback image path
    }
    return "/background_scene.hdr";
  };

  return (
    <>
      {isLoading && <Loader />}
      <Canvas
        camera={getCameraSettings()}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ height: "100vh", background: "#000" }}
        onCreated={() => setIsLoading(false)}
      >
        <directionalLight position={[13, 5, 0]} intensity={4} />
        <ambientLight intensity={0.5} />
        <Suspense>
          <ScrollControls damping={0.2} pages={3}>
            <Model />
          </ScrollControls>
          <Environment files={getEnvironmentFile()} background />
        </Suspense>
        <OrbitControls minDistance={7} maxDistance={13} />
      </Canvas>
    </>
  );
}
