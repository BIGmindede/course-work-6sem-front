import CategoryService from "shared/config/http/categoryService"
import { fetchCategoriesError,fetchCategoriesLoading,
    fetchCategoriesSuccess, updateCategoriesSuccess } 
    from "../reducers/CategorySlice"

export const create = (title, author, request) => async (dispatch) => {
    dispatch(fetchCategoriesLoading())
    try {
        const { data } = await CategoryService.create(title, author, request) 
        dispatch(updateCategoriesSuccess(categoriesList => [...categoriesList, data]))
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
        dispatch(updateCategoriesSuccess(categoriesList =>
            categoriesList.filter(category => category.id !== id)))
    } catch (error) {
        dispatch(fetchCategoriesError(error.message))
    }
}