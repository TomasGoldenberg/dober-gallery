import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import getUuid from "uuid-by-string";
import { useCursor, Image, Text } from "@react-three/drei";

const GOLDENRATIO = 1.61803398875;

const getPropertyByUrl = (images, currentNft, property) => {
  const nft = images.find((item) => item.url === currentNft);
  return nft[property] || "Dober Girl";
};

const Frame = ({ url, images, c = new THREE.Color(), location, ...props }) => {
  const [hovered, hover] = useState(false);
  // const [rnd] = useState(() => Math.random());
  const image = useRef();
  const frame = useRef();
  const name = getUuid(url);
  useCursor(hovered);
  useFrame((state) => {
    /*   image.current.material.zoom =
        2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
      image.current.scale.x = THREE.MathUtils.lerp(
        image.current.scale.x,
        0.85 * (hovered ? 0.85 : 1),
        0.1
      );
      image.current.scale.y = THREE.MathUtils.lerp(
        image.current.scale.y,
        0.9 * (hovered ? 0.905 : 1),
        0.1
      ); */
    frame.current.material.color.lerp(c.set(hovered ? "orange" : "white"), 0.1);
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / (!location.includes("item") ? 1 : 2), 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      >
        {getPropertyByUrl(images, url, "name")}{" "}
        {getPropertyByUrl(images, url, "price")}ETH{" "}
      </Text>
    </group>
  );
};

export default Frame;
