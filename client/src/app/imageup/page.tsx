'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import Image from 'next/image'
import { X } from 'lucide-react'


type Room = {
    id: string;
    name: string;
};

const rooms = [
    { id: '1', name: 'room1' },
    { id: '2', name: 'room2' },
    { id: '3', name: 'room3' },
];


interface FormValues {
    name: string;
    description: string;
    room: Room;
    image?: FileList;
}

const ProfileForm: React.FC = () => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const imgform = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const tagform = useForm<FormValues>({
        defaultValues: {
            name: '',
            room: rooms[0],
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            imgform.setValue('image', e.target.files as FileList);
        }
    };

    const clearImage = () => {
        setPreviewUrl('');
        imgform.setValue('image', undefined);
    };

    const onSubmit = (data: FormValues) => {
        //console.log(data);
        // ここで送信処理を実装
    };

    return (
        <>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>プロフィール情報</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...imgform}>
                        <form onSubmit={imgform.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={imgform.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>写真</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-col items-center gap-4">
                                                {/* 額縁コンテナ */}
                                                <div className="relative w-[300px]">
                                                    {/* マットボード（白い縁取り部分） */}
                                                    <div className="relative p-8 bg-white shadow-lg">
                                                        {/* 装飾的な額縁の境界 */}
                                                        <div className="absolute inset-0 border-[20px] rounded-sm" style={{
                                                            borderImage: 'linear-gradient(45deg, #D4AF37, #FFD700, #D4AF37) 1',
                                                            background: 'linear-gradient(45deg, #D4AF37, #FFD700, #D4AF37) border-box'
                                                        }}>
                                                            {/* 額縁の装飾パターン */}
                                                            <div className="absolute inset-0 opacity-30"
                                                                style={{
                                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20c5.523 0 10-4.477 10-10S25.523 0 20 0 10 4.477 10 10s4.477 10 10 10z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                                                    backgroundSize: '20px 20px'
                                                                }}
                                                            />
                                                        </div>

                                                        {/* 画像コンテナ */}
                                                        <div className="relative aspect-square">
                                                            {previewUrl ? (
                                                                <>
                                                                    <Image
                                                                        src={previewUrl}
                                                                        alt="Preview"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={clearImage}
                                                                        className="absolute -top-4 -right-4 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-lg"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center bg-gray-50">
                                                                    <span className="text-sm text-gray-500">写真を選択してください</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* シャドウ効果 */}
                                                    <div className="absolute inset-0 shadow-xl pointer-events-none"></div>
                                                </div>

                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="max-w-[200px]"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 名前入力 */}
                            <FormField
                                control={imgform.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>名前</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 詳細入力 */}
                            <FormField
                                control={imgform.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>詳細</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                保存
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* tag */}
            <Card className="w-full max-w-md mx-auto mt-10">
    <CardHeader>
        <CardTitle>tag</CardTitle>
    </CardHeader>
    <CardContent>
        <Form {...tagform}>
            <form onSubmit={tagform.handleSubmit(onSubmit)} className="space-y-6">
                {/* 名前入力 */}
                <FormField
                    control={tagform.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>名前</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* room選択 */}
                <FormField
                    control={tagform.control}
                    name="room"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ルーム</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    const selectedRoom = rooms.find(room => room.id === value);
                                    field.onChange(selectedRoom);
                                }}
                                value={field.value?.id}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="ルームを選択">
                                            {field.value?.name || '選択してください'}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {rooms.map((room) => (
                                        <SelectItem key={room.id} value={room.id}>
                                            {room.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* プレビュー */}
                <h3 className="text-lg font-bold">プレビュー</h3>
                <div className="p-4 bg-gray-100 rounded-md">
                    <div className="text-sm text-gray-500">名前: {tagform.watch('name')}</div>
                    <div className="text-sm text-gray-500">ルーム: {tagform.watch('room')?.name}</div>
                </div>

                <Button type="submit" className="w-full">
                    保存
                </Button>
            </form>
        </Form>
    </CardContent>
</Card>
        </>
    );
};

export default ProfileForm;