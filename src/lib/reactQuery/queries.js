import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const BASE_URL = process.env.NEXT_PUBLIC_API_CONTEXT + API_VERSION;

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: (payload) => axios.post(`${BASE_URL}/subscription`, payload),
    onSuccess: (response) => toast.success(response.data?.message),
    onError: (error) =>
      toast.error(error.response?.data?.message || DEFAULT_ERROR_MESSAGE),
  });
};

export const useSubscriptionDetails = (page, limit) => {
  return useQuery({
    queryKey: ["getSubscriptionDetails", { page, limit }],
    queryFn: () => {
      return axios.get(`${BASE_URL}/subscription`, {
        params: {
          page,
          limit,
        },
      });
    },
  });
};

export const useSubscriptionStats = () => {
  return useQuery({
    queryKey: ["getSubscriptionStats"],
    queryFn: () => {
      return axios.get(`${BASE_URL}/subscriber-stats`);
    },
  });
};
