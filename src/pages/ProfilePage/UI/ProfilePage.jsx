import { listItemElementsClasses, listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthority, updateUserData } from "shared/config/store/actionCreators/authActions"
import { getUserRequests, removeRequest } from "shared/config/store/actionCreators/requestActions"
import { getUserReviews } from "shared/config/store/actionCreators/reviewActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectRequests } from "shared/config/store/reducers/RequestSlice"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { EntityCreator } from "widgets/EntityCreator/EntityCreator"
import { Modal } from "widgets/Modal"

export default () => {

    const dispatch = useDispatch()
    
    const [modalValues, setModalValues] = useState(null)

    const userData = useSelector(selectUserData)
    
    useEffect(() => {
        dispatch(checkAuthority())
        if (userData) {
            dispatch(getUserReviews(userData.id))
            dispatch(getUserRequests(userData.id))
        }
    }, [])

    const userReviewsData = useSelector(selectReviews)
    const userRequestsData = useSelector(selectRequests)
    
    const userReviewsDataTransformer = (fields) => ({
        "Автор": {
            elemClass: listItemElementsClasses.AUTHOR,
            data: fields.author.nickname ?? fields.author.email
        },
        "Надежость": {
            elemClass: listItemElementsClasses.RATE,
            data: fields.reliability?.toFixed(1) || "0.0"
        }
    })

    const userRequestsDataTransformer = (fields) => ({
        "Содержание": {
            elemClass: listItemElementsClasses.CONTENT,
            data: fields.content
        },
        "Статус заявки": {
            data: fields.status
        }
    })

    const userRequestButtons = [
        {
            title: 'Развернуть',
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.status === "В обработке") {
                    setModalValues({
                        title: itemData.title,
                        content: itemData.content,
                        request: itemData.id,
                        author: itemData.author
                    })
                }
            }
        },
        {
            title: 'Удалить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(removeRequest(itemData.id))
            }
        }
    ]

    return (
        <div>
            {modalValues &&
                <Modal
                    closer={() => {setModalValues(null)}}
                    header={modalValues?.title}
                >
                    <div>
                        <p>{modalValues?.content}</p>
                    </div>
                </Modal>
            }
            <EntityCreator
                title={'Настройки профиля'}
                fields={[
                    {
                        type: 'text',
                        preset: userData && userData.nickname,
                        placeholder: 'Имя пользователя',
                        upperLabel: 'Имя пользователя'
                    },
                    {
                        type: 'email',
                        preset: userData && userData.email,
                        placeholder: 'E-mail',
                        upperLabel: 'E-mail'
                    },
                    {
                        type: 'password',
                        placeholder: 'Новый пароль',
                        upperLabel: 'Новый пароль'
                    }
                ]}
                action={(nickname, email, password) => {
                    dispatch(updateUserData(userData.id, email, nickname, password))
                }}
                buttonText={'Сохранить изменения'}
            />
            <DataContainer
                title={'Мои отзывы'}
                data={userReviewsData}
                dataTransformer={userReviewsDataTransformer}
                getTitleField={(itemData) => itemData.title}
                listTheme={listItemThemes.SQUARE}
                collapsable
            />
            <DataContainer
                title={'Мои заявки'}
                data={userRequestsData}
                dataTransformer={userRequestsDataTransformer}
                getTitleField={(itemData) => itemData.title}
                listTheme={listItemThemes.STROKE}
                buttons={userRequestButtons}
                redundant
                collapsable
            />
        </div>
    )
}