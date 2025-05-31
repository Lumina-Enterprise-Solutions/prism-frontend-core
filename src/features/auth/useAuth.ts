import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../api/apiClient";
import { loginSuccess } from "../../store/slices/auth";

// Register
export const useRegister = () =>
  useMutation({
    mutationFn: (data: { email: string; password: string; first_name: string, last_name: string }) =>
      axiosClient.post("/auth/register", data).then((res) => res.data),
  });

// Login
export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      axiosClient.post("/auth/login", data).then((res) => res.data),
    onSuccess: (data) => {
      dispatch(loginSuccess(data.data.access_token));
      queryClient.invalidateQueries({ queryKey: ["me"] });
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
