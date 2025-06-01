import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../api/apiClient";
import { loginSuccess } from "../../store/slices/auth";
import axios from "axios";

// Register
export const useRegister = () =>
  useMutation({
    mutationFn: async (data: { email: string; password: string; first_name: string, last_name: string }) => {
      try {
        const response = await axiosClient.post("/auth/register", data);
        return response.data;
      } catch (error: unknown) {
        let message = 'Registrasi gagal';

        if (axios.isAxiosError(error)) {
          message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Registrasi gagal';
        }

        throw new Error(message);
      }
    }
  });

// Login
export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string, tenant_id: string }) =>
      axiosClient.post("/auth/login", data).then((res) => res.data),
    onSuccess: (data) => {
      const accessToken = data?.data?.access_token;
      const tenantId = data?.data?.user?.tenant_id;

      if (accessToken & tenantId) {
        dispatch(loginSuccess({ access_token: accessToken, tenant_id: tenantId }));
        queryClient.invalidateQueries({ queryKey: ["me"] });
      } else {
        console.error("Missing access token or tenant ID in response")
      }
    },
  });
};

export const useForgotPassword = () => useMutation({
  mutationFn: (data: { email: string }) => axiosClient.post("auth/forgot-password", data).then((res) => res.data),
})

// Reset Password
export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: { password: string, token?: string }) =>
      axiosClient.post("/auth/reset-password", data).then((res) => res.data),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => axiosClient.post("/auth/logout"),
  });
