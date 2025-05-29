import { axiosClient } from "../apiClient";

export const login = (credentials: { email: string; password: string, tenant_id?: string }) => axiosClient.post('/auth/login', credentials);
export const authRegister = (credentials: { email: string; password: string, first_name: string, last_name: string, tenant_id?: string }) => axiosClient.post('/auth/register',credentials)
export const logout = () => axiosClient.post('/auth/logout')