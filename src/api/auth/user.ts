import { axiosClient } from "../apiClient";

export const getAllUsers = (page = 1, limit = 10) =>
    axiosClient.get('/users', {
        params: { page, limit },
    });
export const getUserProfile = () => axiosClient.get(`/users/profile`);
export const updateUserProfile = (data: any) => axiosClient.put(`/users/profile`, data);
export const updateUser = (id: string, data: any) => axiosClient.put(`/users/${id}`, data);
export const deleteUser = (id: string) => axiosClient.delete(`/users/${id}`);
