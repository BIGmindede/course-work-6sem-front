import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        loading: false,
        categoriesList: [],
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
        createCategorySuccess: (state, action) => {
            state.loading = false
            state.categoriesList = [...state.categoriesList, action.payload]
        },
        removeCategorySuccess: (state, action) => {
            state.loading = false
            state.categoriesList = state.categoriesList.filter(category => category._id !== action.payload)
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
    createCategorySuccess,
    removeCategorySuccess,
    fetchCategoriesError
} = categorySlice.actions

export const selectCategories = (state) => state.categories.categoriesList

export default categorySlice.reducer