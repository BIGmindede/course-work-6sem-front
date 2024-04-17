import CategoryService from "shared/config/http/categoryService"
import { fetchCategoriesError,fetchCategoriesLoading,
    fetchCategoriesSuccess, createCategorySuccess, removeCategorySuccess, updateCategorySuccess } 
    from "../reducers/CategorySlice"

export const createCategory = (title, picture, author, request) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.createCategory(title, picture, author, request) 
        dispatch(createCategorySuccess(data))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}

export const updateCategory = (id, title, picture) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.updateCategory(id, title, picture) 
        dispatch(updateCategorySuccess(data))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}

export const getAllCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.getAllCategories()
        dispatch(fetchCategoriesSuccess(data))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}

export const removeCategory = (id) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        if (await CategoryService.removeCategory(id)) {
            dispatch(removeCategorySuccess(id))
        }
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}