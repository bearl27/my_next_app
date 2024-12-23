interface PenIconProps{
  size?: number;
  color?: string;
}

export const PenIcon = ({
  size = 35,
  color = "black",
  ...props
}: PenIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PenIcon"
      role="img"
      {...props}
    >
      <path
        d="M26.25 2.9165L32.0833 8.74984"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9375 29.8957L27.7083 13.1248L21.875 7.2915L5.10413 24.0623L2.91663 32.0832L10.9375 29.8957Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};