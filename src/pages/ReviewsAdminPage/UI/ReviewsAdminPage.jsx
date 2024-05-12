import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllReviews, removeReview } from "shared/config/store/actionCreators/reviewActions"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { transformDate } from "shared/lib/transformDate"
import { DataContainer } from "widgets/DataContainer/DataContainer"

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])

    const buttons = [
        {
            title: 'Подробнее',
            action: (itemData, e) => {
                e.preventDefault()
                navigate(`/review/${itemData.id}`)
            }
        },
        {
            title: 'Удалить',
            action: (itemData, e) => {
                e.preventDefault()
                dispatch(removeReview(itemData.id))
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID отзыва": {data: fields.id},
        "Заголовок": {data: fields.title},
        "ID автора": {data: fields.author.id},
        "Содержание": {data: fields.content},
        "Надежость": {data: fields.reliability},
        "Дата загрузки": {data: transformDate(new Date(fields.date))},
        "Прикрепленная картинка": {data: fields.pictureName}
    })

    return (
        <div>
            <DataContainer
                dataSelector={{ selectorFn: selectReviews, dataKey: "reviewsList" }}
                title={"Администрирование отзывов"}
                buttons={buttons}
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
                getTitleField={(itemData) => itemData.title}
            />
        </div>
    )
}