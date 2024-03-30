import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllReviews, removeReview } from "shared/config/store/actionCreators/reviewActions"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { transformDate } from "shared/lib/transformDate"
import { truncate } from "shared/lib/truncate"
import { DataContainer } from "widgets/DataContainer/DataContainer"

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])

    const reviews = useSelector(selectReviews)

    const buttons = [
        {
            title: 'Перейти',
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
        "Заголовок": {data: fields.title},
        "Автор": {data: fields.author},
        "Содержание": {data: truncate(fields.content, 23)},
        "Надежость": {data: fields.reliability},
        "Дата загрузки": {data: transformDate(new Date(fields.date))},
        "Прикрепленная картинка": {data: fields.pictureName}
    })

    return (
        <div>
            <DataContainer 
                buttons={buttons}
                data={reviews} 
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
            />
        </div>
    )
}