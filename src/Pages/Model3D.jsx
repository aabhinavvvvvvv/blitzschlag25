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

  return (
    <>
      {/* Show the loader when the model is loading */}
      {isLoading && <Loader />}

      <Canvas
        camera={{ position: [13, 3, 0], fov: 65 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ height: "100vh", background: "#000" }}
        onCreated={() => setIsLoading(false)} // Hide loader once the canvas is created
      >
        <directionalLight position={[13, 3, 0]} intensity={4} />
        <ambientLight intensity={0.5} />

        {/* Use Suspense and provide a placeholder */}
        <Suspense
          fallback={
            <></> /* Avoid fallback here since we are using the external Loader */
          }
        >
          <ScrollControls damping={0.2} pages={3}>
            <Model />
          </ScrollControls>
          <Environment files={"/background_scene.hdr"} background />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
}
