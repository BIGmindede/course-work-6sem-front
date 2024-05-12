import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { banUser, getAllUsers } from "shared/config/store/actionCreators/userActions"
import { selectUsers } from "shared/config/store/reducers/UserSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"


export default () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

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
                title={"Администрирование пользователей"}
                buttons={buttons}
                dataSelector={{ selectorFn: selectUsers, dataKey: "usersList" }}
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
                getTitleField={(itemData) => itemData.nickname ? itemData.nickname : itemData.email}
            />
        </div>
    )
}