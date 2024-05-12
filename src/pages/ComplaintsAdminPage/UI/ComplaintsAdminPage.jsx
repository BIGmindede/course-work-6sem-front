import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, ButtonThemes } from "shared/UI/Button/Button"
import ReviewService from "shared/config/http/reviewService"
import UserService from "shared/config/http/userService"
import { getAllComplaints, updateComplaint } from "shared/config/store/actionCreators/complaintActions"
import { selectComplaints } from "shared/config/store/reducers/ComplaintSlice"
import { transformDate } from "shared/lib/transformDate"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { Modal } from "widgets/Modal"

export default () => {

    const dispatch = useDispatch()

    const [modalValues, setModalValues] = useState(null)

    useEffect(() => {
        dispatch(getAllComplaints())
    }, [])

    const buttons = [
        {
            title: 'Обработать',
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.status !== "Обработана") {
                    setModalValues({
                        title: itemData.id,
                        author: itemData.author.nickname ?? itemData.author.email,
                        content: itemData.content,
                        target: itemData.target.nickname ?? itemData.target.email,
                        reviewId: itemData.reviewId,
                        review: itemData.review
                    })
                }
            }
        },
        {
            title: 'Отклонить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(updateComplaint(itemData.id, "Обработана"))
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID жалобы": {data: fields.id},
        "Содержание жалобы": {data: fields.content},
        "ID автора": {data: fields.author.id},
        "ID подозреваемого": {data: fields.target.id},
        "Содержание отмеченного отзыва": {data: fields.review},
        "Статус": {data: fields.status},
        "Дата загрузки": {data: transformDate(fields.date)}
    })

    return (
        <div>
            {modalValues &&
                <Modal 
                    closer={() => {setModalValues(null)}}
                    header={`Обработка жалобы "${modalValues.title}"`}
                >
                    <div>
                        <strong>Автор жалобы: </strong>
                        <span>{modalValues.author}</span>
                    </div>
                    <div>
                        <strong>Содержание жалобы: </strong>
                        <span>{modalValues.content}</span>
                    </div>
                    <hr />
                    <div>
                        <strong>Подозреваемый: </strong>
                        <span>{modalValues.target}</span>
                    </div>
                    <Button
                        action={async () => {
                            await UserService.banUser(modalValues.target)
                            dispatch(updateComplaint(modalValues.title, "Обработка не завершена"))
                        }}
                        className={ButtonThemes.BASIC}
                    >Заблокировать пользователя</Button>
                    {modalValues.review &&
                        <>
                            <div>
                                <strong>Отмеченный отзыв подозреваемого: </strong>
                                <span>{modalValues.review}</span>
                            </div>
                            <Button 
                                action={async () => {
                                    await ReviewService.removeReview(modalValues.reviewId)
                                    dispatch(updateComplaint(modalValues.title, "Обработка не завершена"))
                                }}
                                className={ButtonThemes.BASIC}
                            >Удалить отзыв</Button>
                        </>
                    }
                    <hr />
                    <Button 
                        action={() => {
                            dispatch(updateComplaint(modalValues.title, "Обработана"))
                        }}
                        className={ButtonThemes.BASIC}
                    >Завершить обработку</Button>
                </Modal>
            }
            <DataContainer
                title={"Администрирование жалоб"}
                buttons={buttons}
                dataSelector={{ selectorFn: selectComplaints, dataKey: "complaintsList" }}
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
                getTitleField={(itemData) => itemData.id}
            />
        </div>
    )
}