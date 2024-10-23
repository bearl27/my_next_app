import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useAddressLookup } from './hooks/useAddressLookup';
import { zipCodeSchema } from './schema';
import { ZipCodeInput } from './components/zip-code-input';
import { AddressResult } from './components/address-result';
import { ErrorAlert } from './components/error-alert';

const ZipCodeLookup: React.FC = () => {
    const [zipCode, setZipCode] = useState('');
    const [inputError, setInputError] = useState('');
    const { addressList, error, isLoading, lookupAddress } = useAddressLookup();

    const handleZipCodeInput = (value: string) => {
        setZipCode(value);
        setInputError('');
    };

    const handleLookup = () => {
        try {
            zipCodeSchema.parse(zipCode);
            lookupAddress(zipCode);
        } catch (error) {
            if (error instanceof Error) {
                setInputError(error.message);
            }
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>郵便番号検索</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ZipCodeInput value={zipCode} onChange={handleZipCodeInput} />

                {(inputError || error) && <ErrorAlert message={inputError || error} />}

                {addressList.length > 0 && <AddressResult addressList={addressList} />}
            </CardContent>
            <CardFooter>
                <Button onClick={handleLookup} disabled={isLoading} className="w-full">
                    {isLoading ? "検索中..." : "住所検索"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ZipCodeLookup;