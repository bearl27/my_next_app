import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  playerCount: z.number().min(2).max(10),
});

type PlayerInputProps = {
  onSubmit: (count: number) => void;
};

export const PlayerInput: React.FC<PlayerInputProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = (data: { playerCount: number }) => {
    onSubmit(data.playerCount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="playerCount" className="block text-sm font-medium text-gray-700">
          プレイヤー数 (2-10)
        </label>
        <Input
          id="playerCount"
          type="number"
          {...register('playerCount', { valueAsNumber: true })}
          className="mt-1"
        />
        {errors.playerCount && (
          <p className="mt-1 text-sm text-red-600">{errors.playerCount.message}</p>
        )}
      </div>
      <Button type="submit">開始</Button>
    </form>
  );
};