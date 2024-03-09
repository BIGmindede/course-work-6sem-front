import { Form } from "entities/Form/Form"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { create, getAll, remove } from "shared/config/store/actionCreators/categoryActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectCategories } from "shared/config/store/reducers/CategorySlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { EntityCreator } from "widgets/EntityCreator/EntityCreator"

export default () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAll())
    }, [])

    const authorization = useSelector(selectUserData)
    const adminId = authorization && authorization.id

    const categories = useSelector(selectCategories)

    const buttons = [
        {
            title: 'Удалить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(remove(itemData._id))
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID категории": fields._id,
        "Название категории": fields.title,
        "ID запроса": fields.request ? fields.request : "Без запроса",
        "ID автора": fields.author
    })

    return (
        <div>
            <EntityCreator>
                <h3>Добавить категорию</h3>
                <Form
                    fields={[
                        { type: 'text', placeholder: 'Название категории'}
                    ]}
                    action={(title) => dispatch(create(title, adminId, null))}
                    buttonText={'Создать'}
                />
            </EntityCreator>
            <DataContainer buttons={buttons} data={categories} dataTransformer={dataTransformer}/>
        </div>
    )
}