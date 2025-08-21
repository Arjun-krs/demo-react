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

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const result = await axios.get(`${import.meta.env.VITE_TEST_API}`, config)
            return result?.data

        } catch (err) {
            return rejectWithValue(err.payload.data)
        }
    }
)

export const DeviceList = createAsyncThunk(
    'device/list',
    async (payload, { rejectWithValue }) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const result = await axios.get(`${import.meta.env.VITE_TEST_API}/device/list?access_token=${payload?.accessToken}&account=${payload?.account}`, config)
            return result?.data

        } catch (err) {
            return rejectWithValue(err.payload.data)
        }
    }
)