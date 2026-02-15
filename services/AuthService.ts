import type { LoginRequest, LoginResponse } from "../types/auth";
import api from "./api";

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
};

