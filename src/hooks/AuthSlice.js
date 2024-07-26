import instance from "../instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/login`, {
        email: user.email,
        password: user.password,
      });
      // Save user id to localStorage
      localStorage.setItem("userId", response.data.id);
      return response.data;
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return thunkAPI.rejectWithValue("No user ID found in local storage");
    }

    const response = await instance.get(`/auth/me/${userId}`);
    return response.data;
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await instance.delete("/auth/logout");
  // Remove user id from localStorage
  localStorage.removeItem("userId");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // Reset state to initial state
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // Get User Login
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // Logout
    builder
      .addCase(LogOut.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
