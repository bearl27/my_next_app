import { useState } from 'react';
import axios from 'axios';
import { zipCodeSchema, addressResponseSchema, AddressData } from '../schema';

interface UseAddressLookupResult {
    addressList: string[];
    error: string;
    isLoading: boolean;
    lookupAddress: (zipCode: string) => Promise<void>;
}

export function useAddressLookup(): UseAddressLookupResult {
    const [addressList, setAddressList] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lookupAddress = async (zipCode: string) => {
        try {
            zipCodeSchema.parse(zipCode);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            return;
        }

        setIsLoading(true);
        setError('');
        setAddressList([]);

        try {
            const response = await axios.get<AddressData>(
                `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
            );

            const validatedData = addressResponseSchema.parse(response.data);

            if (validatedData.results) {
                const result = validatedData.results[0];
                setAddressList([result.address1, result.address2, result.address3]);
            } else {
                setError('該当する住所が見つかりません。');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'エラーが発生しました。もう一度お試しください。');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { addressList, error, isLoading, lookupAddress };
}