import { listItemElementsClasses, listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { checkAuthority, updateUserData } from "shared/config/store/actionCreators/authActions"
import { getUserComplaints, removeComplaint } from "shared/config/store/actionCreators/complaintActions"
import { getUserRequests, removeRequest } from "shared/config/store/actionCreators/requestActions"
import { getUserReviews, removeReview } from "shared/config/store/actionCreators/reviewActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectComplaints } from "shared/config/store/reducers/ComplaintSlice"
import { selectRequests } from "shared/config/store/reducers/RequestSlice"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { transformDate } from "shared/lib/transformDate"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { EntityCreator } from "widgets/EntityCreator/EntityCreator"
import { Modal } from "widgets/Modal"

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [modalValues, setModalValues] = useState(null)

    const userData = useSelector(selectUserData)

    useEffect(() => {
        if (userData) {
            dispatch(getUserReviews(userData.id))
            dispatch(getUserRequests(userData.id))
            dispatch(getUserComplaints(userData.id))
        }
    }, [userData])
    
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
            data: fields.content
        },
        "Статус заявки": {
            data: fields.status
        },
        "Дата загрузки": {
            data: transformDate(fields.date)
        }
    })

    const userComplaintsDataTransformer = (fields) => ({
        "Содержание жалобы": {
            data: fields.content
        },
        "Жалоба на": {
            data: fields.target.nickname ?? fields.target.email
        },
        "Содержание отмеченного отзыва": {
            data: fields.review
        },
        "Статус жалобы": {
            data: fields.status
        },
        "Дата загрузки": {
            data: fields.date
        }
    })

    const userDeleteReviewButons = [
        {
            title: "Удалить",
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(removeReview(itemData.id))
            }
        }
    ]

    const userRequestButtons = [
        {
            title: 'Развернуть',
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.status === "В обработке") {
                    setModalValues({
                        type: "request",
                        title: itemData.title,
                        content: itemData.content,
                        request: itemData.id,
                        author: itemData.author.nickname ?? itemData.author.email
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

    const userComplaintButtons = [
        {
            title: 'Развернуть',
            action: (itemData, e) => {
                e.preventDefault()
                console.log(itemData)
                if (itemData.status === "В обработке") {
                    setModalValues({
                        type: "complaint",
                        title: itemData.id,
                        content: itemData.content,
                        review: itemData.review,
                        target: itemData.target.nickname ?? itemData.target.email
                    })
                }
            }
        },
        {
            title: 'Удалить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(removeComplaint(itemData.id))
            }
        }
    ]

    return (
        <div>
            {modalValues?.type === "request" &&
                <Modal
                    closer={() => {setModalValues(null)}}
                    header={modalValues.title}
                >
                    <div>
                        <p>{modalValues.content}</p>
                    </div>
                </Modal>
            }
            {modalValues?.type === "complaint" &&
                <Modal
                    closer={() => {setModalValues(null)}}
                    header={modalValues.title}
                >
                    <div>
                        <p>{modalValues.content}</p>
                        <hr />
                        <p><strong>Жалоба на:</strong> {modalValues.target}</p>
                        <p><strong>На отзыв:</strong> {modalValues.review}</p>
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
                dataSelector={{ selectorFn: selectReviews, dataKey: "reviewsList" }}
                dataTransformer={userReviewsDataTransformer}
                getTitleField={(itemData) => itemData.title}
                listTheme={listItemThemes.SQUARE}
                itemsOnClick={(itemData) => {
                    navigate(`/review/${itemData.id}`)
                }}
                buttons={userDeleteReviewButons}
                collapsable
            />
            <DataContainer
                title={'Мои заявки'}
                dataSelector={{ selectorFn: selectRequests, dataKey: "requestsList" }}
                dataTransformer={userRequestsDataTransformer}
                getTitleField={(itemData) => itemData.title}
                listTheme={listItemThemes.STROKE}
                buttons={userRequestButtons}
                redundant
                collapsable
            />
            <DataContainer
                title={'Мои жалобы'}
                dataSelector={{ selectorFn: selectComplaints, dataKey: "complaintsList" }}
                dataTransformer={userComplaintsDataTransformer}
                getTitleField={(itemData) => itemData.id}
                listTheme={listItemThemes.STROKE}
                buttons={userComplaintButtons}
                redundant
                collapsable
            />
        </div>
    )
}