'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Memo {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

const MemoPage: React.FC = () => {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [newMemo, setNewMemo] = useState({ title: '', content: '' });
    const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

    useEffect(() => {
        fetchMemos();
    }, []);

    const fetchMemos = async () => {
        try {
            const response = await fetch('/api/memos');
            if (!response.ok) throw new Error('Failed to fetch memos');
            const data = await response.json();
            setMemos(data);
        } catch (error) {
            console.error('Failed to fetch memos:', error);
        }
    };

    const createMemo = async () => {
        try {
            const response = await fetch('/api/memos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMemo),
            });
            if (!response.ok) throw new Error('Failed to create memo');
            setNewMemo({ title: '', content: '' });
            fetchMemos();
        } catch (error) {
            console.error('Failed to create memo:', error);
        }
    };

    const updateMemo = async () => {
        if (!editingMemo) return;
        try {
            const response = await fetch(`/api/memos/${editingMemo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingMemo),
            });
            if (!response.ok) throw new Error('Failed to update memo');
            setEditingMemo(null);
            fetchMemos();
        } catch (error) {
            console.error('Failed to update memo:', error);
        }
    };

    const deleteMemo = async (id: number) => {
        try {
            const response = await fetch(`/api/memos/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete memo');
            fetchMemos();
        } catch (error) {
            console.error('Failed to delete memo:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Memo App</h1>

            {/* Create new memo form */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Create New Memo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-4">
                        <Input
                            placeholder="Title"
                            value={newMemo.title}
                            onChange={(e) => setNewMemo({ ...newMemo, title: e.target.value })}
                        />
                        <Input
                            placeholder="Content"
                            value={newMemo.content}
                            onChange={(e) => setNewMemo({ ...newMemo, content: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={createMemo}>Add Memo</Button>
                </CardFooter>
            </Card>

            {/* List of memos */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {memos.map((memo) => (
                    <Card key={memo.id}>
                        <CardHeader>
                            <CardTitle>{memo.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{memo.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => setEditingMemo(memo)}>Edit</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Memo</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col space-y-4">
                                        <Input
                                            value={editingMemo?.title || ''}
                                            onChange={(e) => setEditingMemo(prev => prev ? { ...prev, title: e.target.value } : null)}
                                            placeholder="Title"
                                        />
                                        <Input
                                            value={editingMemo?.content || ''}
                                            onChange={(e) => setEditingMemo(prev => prev ? { ...prev, content: e.target.value } : null)}
                                            placeholder="Content"
                                        />
                                        <Button onClick={updateMemo}>Save Changes</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button variant="destructive" onClick={() => deleteMemo(memo.id)}>Delete</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MemoPage;