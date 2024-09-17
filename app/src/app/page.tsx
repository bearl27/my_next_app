import React, { useState } from 'react';
import { PlayerInput } from '@/feature/player-input';
import { AmidakujiBoard } from './AmidakujiBoard';
import { BridgeInput } from './BridgeInput';
import { AnimationController } from './AnimationController';
import { ResultDisplay } from './ResultDisplay';

export const AmidakujiApp: React.FC = () => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [bridges, setBridges] = useState<boolean[][]>([]);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  const handlePlayerCountSubmit = (count: number) => {
    setPlayerCount(count);
    setBridges(Array(count).fill(Array(count - 1).fill(false)));
  };

  const handleBridgeToggle = (row: number, col: number) => {
    const newBridges = bridges.map((r, i) =>
      i === row ? r.map((b, j) => (j === col ? !b : b)) : r
    );
    setBridges(newBridges);
  };

  const handleAnimationComplete = (results: number[]) => {
    setAnimationComplete(true);
    setResults(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">あみだくじ</h1>
      {playerCount === 0 ? (
        <PlayerInput onSubmit={handlePlayerCountSubmit} />
      ) : (
        <>
          <AmidakujiBoard playerCount={playerCount} bridges={bridges} />
          <BridgeInput
            playerCount={playerCount}
            bridges={bridges}
            onBridgeToggle={handleBridgeToggle}
          />
          <AnimationController
            playerCount={playerCount}
            bridges={bridges}
            onAnimationComplete={handleAnimationComplete}
          />
          {animationComplete && <ResultDisplay results={results} />}
        </>
      )}
    </div>
  );
};