import { axiosClient } from "../apiClient";

export const getUserProfile = () => axiosClient.get('/user/profile');