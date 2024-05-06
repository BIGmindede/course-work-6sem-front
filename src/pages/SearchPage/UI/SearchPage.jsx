import { listItemElementsClasses, listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { checkAuthority } from "shared/config/store/actionCreators/authActions"
import { getFilteredReviews } from "shared/config/store/actionCreators/reviewActions"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { DataContainer } from "widgets/DataContainer/DataContainer"

export default () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(checkAuthority())
    },[])

    useEffect(() => {
        const query = Object.fromEntries([...searchParams])
        dispatch(getFilteredReviews({...query, page: 1, portion: 20}))
    }, [searchParams])

    const reviews = useSelector(selectReviews)

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
                data={reviews}
                dataTransformer={dataTransformer}
                listTheme={listItemThemes.SQUARE}
                itemsOnClick={(itemData) => navigate(`/review/${itemData.id}`)}
                getTitleField={(itemData) => itemData.title}
            />
        </div>
    )
}