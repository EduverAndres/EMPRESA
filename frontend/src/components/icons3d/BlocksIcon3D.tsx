function MiniCube({
  x,
  y,
  z,
  edge,
  front,
  top,
  side,
}: {
  x: number;
  y: number;
  z: number;
  edge: number;
  front: string;
  top: string;
  side: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: edge,
        height: edge,
        transformStyle: "preserve-3d",
        transform: `translateZ(${z}px)`,
      }}
    >
      <div
        className="absolute rounded-[3px] border border-white/15"
        style={{ width: edge, height: edge, background: front, transform: `translateZ(${edge / 2}px)` }}
      />
      <div
        className="absolute rounded-[3px] border border-white/10"
        style={{ width: edge, height: edge, background: side, transform: `rotateY(90deg) translateZ(${edge / 2}px)` }}
      />
      <div
        className="absolute rounded-[3px] border border-white/20"
        style={{ width: edge, height: edge, background: top, transform: `rotateX(90deg) translateZ(${edge / 2}px)` }}
      />
    </div>
  );
}

export default function BlocksIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const edge = size * 0.42;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 700 }}
    >
      <div
        className="relative animate-float-slower"
        style={{
          width: edge * 2,
          height: edge * 2,
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg) rotateY(28deg)",
        }}
      >
        <MiniCube
          x={0}
          y={edge * 0.55}
          z={0}
          edge={edge}
          front="linear-gradient(135deg, rgba(22,58,140,0.9), rgba(10,20,46,0.95))"
          top="linear-gradient(135deg, rgba(50,116,235,0.9), rgba(22,58,140,0.9))"
          side="linear-gradient(135deg, rgba(15,34,80,0.9), rgba(6,11,26,0.95))"
        />
        <MiniCube
          x={edge * 0.62}
          y={0}
          z={edge * 0.3}
          edge={edge}
          front="linear-gradient(135deg, rgba(125,190,252,0.85), rgba(31,84,200,0.95))"
          top="linear-gradient(135deg, rgba(196,232,253,0.9), rgba(59,130,246,0.8))"
          side="linear-gradient(135deg, rgba(25,68,164,0.9), rgba(13,29,68,0.9))"
        />
        <MiniCube
          x={edge * 0.62}
          y={edge * 0.95}
          z={edge * 0.7}
          edge={edge}
          front="linear-gradient(135deg, rgba(59,130,246,0.9), rgba(27,73,176,0.9))"
          top="linear-gradient(135deg, rgba(165,214,253,0.9), rgba(59,130,246,0.75))"
          side="linear-gradient(135deg, rgba(19,48,116,0.9), rgba(10,20,46,0.9))"
        />
      </div>
    </div>
  );
}
