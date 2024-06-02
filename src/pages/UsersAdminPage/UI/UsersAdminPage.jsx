import { Form } from "entities/Form/Form"
import { listItemThemes } from "entities/ListItem/ListItem"
import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { banUser, getAllUsers, setUserRole, unbanUser } from "shared/config/store/actionCreators/userActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectUsers } from "shared/config/store/reducers/UserSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { Modal } from "widgets/Modal"


export default () => {

    const dispatch = useDispatch()

    // Это костыль который есть нужда делать ибо уже поздно рыпаться
    const roles = ["user", "moderator", "admin"]

    const [editUserModalData, setEditUserModalData] = useState(null)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const authority = useSelector(selectUserData)

    const buttons = [
        {
            title: 'Изменить роль',
            action: (itemData, e) => {
                e.preventDefault()
                setEditUserModalData(itemData)
            },
            disabled: (itemData) => itemData.id === authority.id
        },
        {
            title: (itemData) => itemData.isActivated === true ? "Блокировать" : "Активировать",
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.isActivated) {
                    dispatch(banUser(itemData.id))
                }
                else {
                    dispatch(unbanUser(itemData.id))
                }
                
            },
            disabled: (itemData) => itemData.id === authority.id
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
            {editUserModalData &&
                <Suspense fallback=''>
                    <Modal 
                        closer={() => setEditUserModalData(null)}
                        header={'Изменить данные пользователя'}
                    >
                        <Form
                            fields={[
                                {
                                    type: 'select',
                                    placeholder: [
                                        editUserModalData.role,
                                        ...roles.filter(role => role !== editUserModalData.role)
                                    ],
                                    upperLabel: 'Выберите роль'
                                }
                            ]}
                            action={(role) => {
                                setEditUserModalData(null)
                                return dispatch(setUserRole(editUserModalData.id, role))
                            }}
                            buttonText={'Сохранить'}
                        />
                    </Modal>
                </Suspense>
            }
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