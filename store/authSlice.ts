import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    name: string;
    email: string;
    birthdate: string;
    password: string;
    phone: string;
    cpfCnpj: string;
    postalCode: string;
    city: string;
    address: string;
    addressNumber: string;
    complement: string;
    province: string;
    state: string;
    gender: string;
    notificationDisabled: boolean;
    pendingUpdatePassword?: boolean;
    clientToken?: string;
    profileId?: string;
    lastTestDate?: string;
    createdAt: string;
    id?: string;
    type: 'professor' | 'student';
};

type AuthState = {
    user: User | null;
    isLogged: boolean;
};

const initialState: AuthState = {
    user: null,
    isLogged: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLogged = true;
        },
        clearUser(state) {
            state.user = null;
            state.isLogged = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
