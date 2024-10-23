'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

const universities = [
    { value: "tokyo", label: "東京大学" },
    { value: "kyoto", label: "京都大学" },
    { value: "osaka", label: "大阪大学" },
    { value: "tohoku", label: "東北大学" },
    { value: "nagoya", label: "名古屋大学" },
];

const SchoolInfo = () => {
    const [selectedUniversity, setSelectedUniversity] = useState("");

    const form = useForm({
        defaultValues: {
            school_name: "",
        },
    });

    const handleSubmit = (data) => {
        console.log(data);
        // ここで保存処理を行う
    };

    const style = {
        card: "w-full max-w-md mx-auto",
        content: "space-y-4",
    };

    return (
        <Card className={style.card}>
            <CardHeader>
                <CardTitle>学校情報</CardTitle>
            </CardHeader>
            <CardContent className={style.content}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className={style.content}>
                        <FormField
                            control={form.control}
                            name="school_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>学校名</FormLabel>
                                    <Command>
                                        <CommandInput placeholder="大学を検索..." />
                                        <CommandList>
                                            <CommandEmpty>見つかりません。</CommandEmpty>
                                            <CommandGroup title="大学">
                                                {universities.map((university) => (
                                                    <CommandItem
                                                        key={university.value}
                                                        value={university.value}
                                                        onSelect={(currentValue) => {
                                                            setSelectedUniversity(currentValue);
                                                            form.setValue("school_name", currentValue);
                                                        }}
                                                    >
                                                        {university.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">保存</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SchoolInfo;