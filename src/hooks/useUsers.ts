'use client';

import { useState, useCallback } from "react";
import { User, UserInput, UserServiceResponse } from "@/types/admin/user";
import {
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
} from "@/services/usersService";

interface UseUsersReturn {
    users: User[];
    isLoading: boolean;
    error: string | null;
    getUsers: (perPage?: number) => Promise<void>;
    createUser: (user: UserInput) => Promise<UserServiceResponse<User>>;
    updateUser: (id: number, user: UserInput) => Promise<UserServiceResponse<User>>;
    deleteUser: (id: number) => Promise<UserServiceResponse>;
    clearError: () => void;
}

export function useUsers(): UseUsersReturn {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const getUsers = useCallback(async (perPage: number = 20) => {
        setIsLoading(true);
        setError(null);

        const result = await getUsersService(perPage);

        if (result.success && result.data) {
            setUsers(result.data);
        } else {
            setError(result.message || 'Error desconocido');
            setUsers([]);
        }

        setIsLoading(false);
    }, []);

    const updateUser = useCallback(async (id: number, userData: UserInput): Promise<UserServiceResponse<User>> => {
        setIsLoading(true);
        setError(null);

        const result = await updateUserService(id, userData);

        setIsLoading(false);
        return result;

    }, []);

    const createUser = useCallback(async (userData: UserInput): Promise<UserServiceResponse<User>> => {
        setIsLoading(true);
        setError(null);

        const result = await createUserService(userData);

        setIsLoading(false);
        return result;
    }, []);

    const deleteUser = useCallback(async (id: number): Promise<UserServiceResponse> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteUserService(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result;
    }, []);

    return {
        users,
        isLoading,
        error,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        clearError,
    };
}