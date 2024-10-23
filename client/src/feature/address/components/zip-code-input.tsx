import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

interface ZipCodeInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ value, onChange }) => (
    <div className="space-y-2">
        <Label htmlFor="zipcode">郵便番号</Label>
        <InputOTP maxLength={7} value={value} onChange={onChange}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
            </InputOTPGroup>
        </InputOTP>
    </div>
);