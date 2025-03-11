import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://transaction-tracker-app-backend.onrender.com/api/v1";

// Fetch all transactions (GET /transactions)
export const fetchTransactions = createAsyncThunk("transactions/fetch", async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data.result;
});

// Add a new transaction (POST /create)
export const addTransaction = createAsyncThunk("transactions/add", async (transaction) => {
  const response = await axios.post(`${API_URL}/create`, transaction);
  return response.data.result;
});

// Edit (update) a transaction (PUT /update/:id)
export const editTransaction = createAsyncThunk("transactions/edit", async ({ id, updatedData }) => {
  // console.log("slice" , id, updatedData)
  const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
  return response.data.result;
});

// Delete a transaction (DELETE /delete/:id)
export const deleteTransaction = createAsyncThunk("transactions/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState: { transactions: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        if (!action.payload || !action.payload._id) {
          // console.error("Edit failed: No valid response", action.payload);
          return;
        }
        
        state.transactions = state.transactions.map((tx) =>
          tx._id === action.payload._id ? action.payload : tx
        );
           
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((tx) => tx._id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
