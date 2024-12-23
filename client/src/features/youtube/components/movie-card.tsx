import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function ConfettiComponent() {
  const [earnStatus, setEarnStatus] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (earnStatus) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [earnStatus]);

  const handleClick = () => {
    setEarnStatus((prev) => !prev);
  };

  return (
    <div className="z-10 basis-1/12">
      {showConfetti && (
        <>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={100}
            recycle={false}
            confettiSource={{
              x: 0,
              y: windowSize.height / 2,
              w: 0,
              h: 0,
            }}
            initialVelocityX={10}
            wind={2}
          />
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={100}
            recycle={false}
            confettiSource={{
              x: windowSize.width,
              y: windowSize.height / 2,
              w: 0,
              h: 0,
            }}
            initialVelocityX={-10}
            wind={-2}
          />
        </>
      )}
      <div className="mx-auto h-full max-w-md flex justify-center items-center">
        <button onClick={handleClick} type="button">
          good
        </button>
      </div>
    </div>
  );
}