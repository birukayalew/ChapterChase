import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import auth from "../../configs/firebase.config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

interface IUser {
    user: {
        name: string | null;
        email: string | null;
        img: string | null;
        role: string | null;
    };
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

interface IUserCredentials {
    email: string;
    password: string;
}

const initialState: IUser = {
    user: {
        name: null,
        email: null,
        img: null,
        role: null,
    },
    isLoading: false,
    isError: false,
    error: null,
};

export const emailPasswordUserCreate = createAsyncThunk(
    "user/emailPasswordUserCreate",
    async ({ email, password }: IUserCredentials) => {
        const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return data.user;
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }: IUserCredentials) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user;
    }
);

export const continueWithGoogle = createAsyncThunk(
    "user/continueWithGoogle",
    async () => {
        const data = await signInWithPopup(auth, googleProvider);
        return data.user;
    }
);

export const continueWithGithub = createAsyncThunk(
    "user/continueWithGithub",
    async () => {
        const data = await signInWithPopup(auth, githubProvider);
        return data.user;
    }
);

export const continueWithFacebook = createAsyncThunk(
    "user/continueWithFacebook",
    async () => {
        const data = await signInWithPopup(auth, facebookProvider);
        return data.user;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                state.user.email = action.payload;
                state.user.name = action.payload;
                state.user.img = action.payload;
                state.user.role = action.payload;
            } else {
                state.user.email = action.payload.email;
                state.user.name = action.payload.name;
                state.user.img = action.payload.img;
                state.user.role = action.payload.role;
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.email = action.payload.email;
                state.user.name = action.payload.displayName;
                state.user.img = action.payload.photoURL;
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
