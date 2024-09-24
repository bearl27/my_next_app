import { NextResponse } from 'next/server';

let memos = [
  {
    id: 1,
    title: "First Memo",
    content: "This is the first memo",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Second Memo",
    content: "This is the second memo",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const memoIndex = memos.findIndex((memo) => memo.id === id);

  if (memoIndex === -1) {
    return new NextResponse(JSON.stringify({ message: "Memo not found" }), { status: 404 });
  }

  const body = await request.json();
  memos[memoIndex] = {
    ...memos[memoIndex],
    ...body,
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json(memos[memoIndex]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const memoIndex = memos.findIndex((memo) => memo.id === id);

  if (memoIndex === -1) {
    return new NextResponse(JSON.stringify({ message: "Memo not found" }), { status: 404 });
  }

  memos = memos.filter((memo) => memo.id !== id);
  return NextResponse.json({ message: "Memo deleted successfully" });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const memo = memos.find((memo) => memo.id === id);

  if (!memo) {
    return new NextResponse(JSON.stringify({ message: "Memo not found" }), { status: 404 });
  }

  return NextResponse.json(memo);
}