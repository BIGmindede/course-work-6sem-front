import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthority } from "shared/config/store/actionCreators/authActions"
import { banUser, getAllUsers } from "shared/config/store/actionCreators/userActions"
import { selectUsers } from "shared/config/store/reducers/UserSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"


export default () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthority())
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(selectUsers)

    const buttons = [
        {
            title: 'Подробнее',
            action: (itemData, e) => {
                e.preventDefault()
            }
        },
        {
            title: 'Блокировать',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(banUser(itemData.id))
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID пользователя": {data: fields.id},
        "E-mail": {data: fields.email},
        "Имя пользователя": {data: fields.nickname ?? "Не установлено"},
        "Статус активации": {data: fields.isActivated ? "Активирован" : "Заблокирован"},
        "Роль": {data: fields.role}
    })

    return (
        <div>
            <DataContainer 
                buttons={buttons}
                data={users} 
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
                getTitleField={(itemData) => itemData.nickname ? itemData.nickname : itemData.email}
            />
        </div>
    )
}