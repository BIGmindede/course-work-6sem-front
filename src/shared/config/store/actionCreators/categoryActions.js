import CategoryService from "shared/config/http/categoryService"
import { fetchCategoriesError,fetchCategoriesLoading,
    fetchCategoriesSuccess, createCategorySuccess, removeCategorySuccess } 
    from "../reducers/CategorySlice"

export const create = (title, author, request) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.create(title, author, request) 
        dispatch(createCategorySuccess(data))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}

export const getAll = () => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.getAll()
        dispatch(fetchCategoriesSuccess(data))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}

export const remove = (id) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        await CategoryService.remove(id)
        dispatch(removeCategorySuccess(id))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}