import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ScrollControls } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Model from "../../public/Model";
import { Environment } from "@react-three/drei";
import Loader from "../Components/modelLoader"; // Import your custom Loader component

export default function Model3D() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  // Function to determine camera settings based on window size
  const getCameraSettings = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return { position: [8, 4, 0], fov: 110 };
    }
    return { position: [13, 6, 0], fov: 65 };
  };

  return (
    <>
      {/* Show the loader when the model is loading */}
      {isLoading && <Loader />}

      <Canvas
        camera={getCameraSettings()} // Use responsive camera settings
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ height: "100vh", background: "#000" }}
        onCreated={() => setIsLoading(false)} // Hide loader once the canvas is created
      >
        <directionalLight position={[13, 5, 0]} intensity={4} />
        <ambientLight intensity={0.5} />

        {/* Use Suspense and provide a placeholder */}
        <Suspense
        >
          <ScrollControls damping={0.2} pages={3}>
            <Model />
          </ScrollControls>
          <Environment files={"/background_scene.hdr"} background />
        </Suspense>
        <OrbitControls minDistance={7} maxDistance={13} />
      </Canvas>
    </>
  );
}