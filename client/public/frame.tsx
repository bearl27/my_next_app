
function Frame({ width = 128, height = 128 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
        {/* 外枠 */}
        <rect
          x="10"
          y="10"
          width="380"
          height="380"
          stroke="#8B4513"
          strokeWidth="20"
          fill="#DEB887"
        />

        {/* 装飾的なコーナー */}
        <path
          d="M0 0 L80 0 Q60 0 60 20 L60 60 Q60 80 40 80 L0 80 Q20 80 20 60 L20 20 Q20 0 0 0 Z"
          fill="#8B4513"
        />
        <path
          d="M400 0 L320 0 Q340 0 340 20 L340 60 Q340 80 360 80 L400 80 Q380 80 380 60 L380 20 Q380 0 400 0 Z"
          fill="#8B4513"
          transform="translate(0 0)"
        />
        <path
          d="M0 400 L80 400 Q60 400 60 380 L60 340 Q60 320 40 320 L0 320 Q20 320 20 340 L20 380 Q20 400 0 400 Z"
          fill="#8B4513"
        />
        <path
          d="M400 400 L320 400 Q340 400 340 380 L340 340 Q340 320 360 320 L400 320 Q380 320 380 340 L380 380 Q380 400 400 400 Z"
          fill="#8B4513"
        />

        {/* 内側の装飾 */}
        <rect
          x="40"
          y="40"
          width="320"
          height="320"
          stroke="#A0522D"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
        />
      </svg>
    );
  };
  export default Frame;