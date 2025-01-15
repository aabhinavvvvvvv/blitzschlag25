import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ScrollControls, Environment, OrbitControls } from "@react-three/drei";
import Model from "../../public/Model";
import Loader from "../Components/modelLoader";

export default function Model3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [usePreset, setUsePreset] = useState(false);

  // Determine whether to use the "studio" preset for mobile
  useEffect(() => {
    const updateBackground = () => {
      setUsePreset(window.innerWidth < 768); // Use "studio" preset for phones
    };

    updateBackground(); // Initial check
    window.addEventListener("resize", updateBackground); // Listen for resize events

    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, []);

  const getCameraSettings = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return { position: [8, 4, 0], fov: 110 };
    }
    return { position: [13, 6, 0], fov: 65 };
  };
  

  return (
    <>
      {isLoading && <Loader />}
      <Canvas
        camera={getCameraSettings()}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ height: "100vh" }}
        onCreated={() => setIsLoading(false)}
      >
        <directionalLight position={[13, 5, 0]} intensity={4} />
        <ambientLight intensity={0.5} />
        <Suspense>
          <ScrollControls damping={0.2} pages={3}>
            <Model />
          </ScrollControls>
          {usePreset ? (
            <Environment preset="night" background  />
          ) : (
            <Environment files="/background_scene.hdr" background />
          )}
        </Suspense>
        <OrbitControls minDistance={7} maxDistance={13} enablePan={false} />
      </Canvas>
    </>
  );
}