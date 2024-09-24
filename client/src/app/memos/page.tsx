import React from 'react';
import { notFound } from 'next/navigation';

// 必要に応じて、型定義をインポートしてください
// import { Memo } from '@/types';

type Props = {
  params: { id: string };
};

async function getMemo(id: string) {
  // ここでメモを取得するロジックを実装します
  // 例: APIからのフェッチや、データベースからの取得など
  // この例では、仮のデータを返しています
  const memo = { id, title: `メモ ${id}`, content: `これはメモ ${id} の内容です。` };

  if (!memo) {
    notFound();
  }

  return memo;
}

export default async function MemoPage({ params }: Props) {
  const memo = await getMemo(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{memo.title}</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>{memo.content}</p>
      </div>
    </div>
  );
}