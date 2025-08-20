import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const vehicleList = createAsyncThunk(
    'list/vehicle_master',
    async (payload = {}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            };
            const result = await axios.post(`${import.meta.env.VITE_API_IPLANT}/master/vehicle/list`, payload, config)

            return result?.data

        } catch (err) {
            return rejectWithValue(err.payload.data)
        }
    }
)

export const authCheck = createAsyncThunk(
    'auth/check',
    async (payload, { rejectWithValue }) => {
        console.log('payload',payload);
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const result = await axios.get(`${import.meta.env.VITE_API_PROTRACK}/authorization?time=${payload?.time}&account=${payload?.account}&signature=${payload?.signature}`, config)

            return result

        } catch (err) {
            return rejectWithValue(err.payload.data)
        }
    }
)