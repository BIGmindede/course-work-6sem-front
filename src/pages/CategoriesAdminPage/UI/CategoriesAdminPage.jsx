import { Form } from "entities/Form/Form"
import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCategory, getAllCategories, removeCategory, updateCategory } from "shared/config/store/actionCreators/categoryActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectCategories } from "shared/config/store/reducers/CategorySlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { EntityCreator } from "widgets/EntityCreator/EntityCreator"
import { Modal } from "widgets/Modal"

export default () => {

    const [modalActiveItem, setModalActiveItem] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const authorization = useSelector(selectUserData)
    const adminId = authorization && authorization.id

    const categories = useSelector(selectCategories)

    const buttons = [
        {
            title: 'Изменить',
            action: (itemData, e) => {
                e.preventDefault()
                setModalActiveItem(itemData.id)
            }
        },
        {
            title: 'Удалить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(removeCategory(itemData.id))
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID категории": {data: fields.id},
        "ID запроса": {data: fields.request ? fields.request : "Без запроса"},
        "ID автора": {data: fields.author}
    })

    return (
        <div>
            {modalActiveItem &&   
                <Modal closer={() => setModalActiveItem(null)}>
                    <Form
                        fields={[
                            { type: 'text', placeholder: 'Изменить название'},
                            { type: 'file', placeholder: 'Картинка'}
                        ]}
                        action={(title, picture) => {
                            dispatch(updateCategory(modalActiveItem, title, picture))
                            setModalActiveItem(null)
                        }}
                        buttonText={"Сохранить"}
                    />
                </Modal>
            }
            <EntityCreator
                title={"Добавить категорию"}
                fields={[
                    { type: 'text', placeholder: 'Название категории'},
                    { type: 'file', placeholder: 'Картинка'}
                ]}
                action={(title, picture) => dispatch(createCategory(title, picture, adminId, null))}
                buttonText={'Создать'}
            />
            <DataContainer
                buttons={buttons}
                data={categories}
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
            />
        </div>
    )
}