import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { TriangleAlert } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
    <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);