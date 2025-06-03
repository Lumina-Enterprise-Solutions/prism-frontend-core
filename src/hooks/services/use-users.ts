// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import {
    updateUser,
    deleteUser
} from '../../api/auth/user';
import { getUserProfile, updateUserProfile } from '../../api/auth/user';
import { axiosClient } from '../../api/apiClient';

interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    status: string;
    roles: string[];
    created_at: string;
    updated_at: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface GetUsersResponse {
    data: {
        users: User[];
        pagination: Pagination;
    };
    message: string;
    success: boolean;
}

export const getAllUsers = async (page = 1, limit = 10): Promise<GetUsersResponse> => {
    const response = await axiosClient.get('/users', {
        params: { page, limit },
    });
    return response.data;
};


export const useUsers = (page = 1, limit = 10): UseQueryResult<GetUsersResponse, Error> => {
    return useQuery<GetUsersResponse, Error>({
        queryKey: ['users', page, limit],
        queryFn: () => getAllUsers(page, limit),
        staleTime: 1000 * 60 * 1, // opsional
        // keepPreviousData: true,
    });
};

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => (await getUserProfile()).data,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: User) => updateUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        },
    });
};


export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: User }) => updateUser(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
