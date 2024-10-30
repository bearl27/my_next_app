'use client';

import { useState } from "react";
import ReactConfetti from "react-confetti";

export default function Page() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const handleClick = () => {
    setShowConfetti(true);
    setButtonEnabled(false);
  };

  const confettiComplete = () => {
    setShowConfetti(false);
    setButtonEnabled(true);
  }

  return (
    <div className="z-10 basis-1/12">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={100}
          recycle={false}
          colors={[
            '#00BCD4', // ターコイズブルー
            '#1E88E5', // ブライトブルー
            '#40E0D0', // ターコイズ
            '#4FC3F7', // ライトブルー
            '#B2EBF2'  // パステルターコイズ
          ]}
          opacity={0.8}
          gravity={0.3}
          initialVelocityY={20}
          confettiSource={{
            x: window.innerWidth / 2,
            y: window.innerHeight,
            w: 0,
            h: 0
          }}
          tweenDuration={3000}
          onConfettiComplete={() => confettiComplete()}
        />
      )}
      <div className="mx-auto h-full max-w-md flex justify-center items-center">
      <button
          disabled={!buttonEnabled}
          onClick={handleClick}
          type="button"
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            buttonEnabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {buttonEnabled ? 'Click!' : "You can't click!"}
        </button>
      </div>
    </div>
  );
}