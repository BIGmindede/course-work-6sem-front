import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        loading: false,
        categoriesList: null,
        error: null
    },
    reducers: {
        fetchCategoriesLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchCategoriesSuccess: (state, action) => {
            state.loading = false
            state.categoriesList = action.payload
        },
        updateCategoriesSuccess: (state, action) => {
            state.loading = false
            state.categoriesList = action.payload(state.categoriesList)
        },
        fetchCategoriesError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchCategoriesLoading,
    fetchCategoriesSuccess,
    updateCategoriesSuccess,
    fetchCategoriesError
} = categorySlice.actions

export const selectCategories = (state) => state.categories.categoriesList

export default categorySlice.reducer