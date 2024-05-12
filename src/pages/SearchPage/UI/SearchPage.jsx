import { listItemElementsClasses, listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getFilteredReviews } from "shared/config/store/actionCreators/reviewActions"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"

export default () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const query = Object.fromEntries([...searchParams])
        dispatch(getFilteredReviews({...query, page: 1, portion: 20}))
    }, [searchParams])

    const dataTransformer = (fields) => ({
        "Автор": {
            elemClass: listItemElementsClasses.AUTHOR,
            data: fields.author.nickname ?? fields.author.email
        },
        "Надежость": {
            elemClass: listItemElementsClasses.RATE,
            data: fields?.reliability?.toFixed(1) ?? "0.0"
        }
    })

    return (
        <div>
            <DataContainer
                title={"Результат поиска"}
                dataSelector={{ selectorFn: selectReviews, dataKey: "reviewsList" }}
                dataTransformer={dataTransformer}
                listTheme={listItemThemes.SQUARE}
                itemsOnClick={(itemData) => {
                    navigate(`/review/${itemData.id}`)
                }}
                getTitleField={(itemData) => itemData.title}
            />
        </div>
    )
}