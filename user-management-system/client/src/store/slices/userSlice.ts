import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, updateUserProfile, getAllUsers, getUserById } from '../../services/api';

interface UserState {
  user: any | null;
  users: any[];
  selectedUser: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await getProfile();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: { name: string; email: string; bio: string }, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllUsers();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getUserById(id);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
