import { listItemElementsClasses, listItemThemes } from "entities/ListItem/ListItem"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "shared/config/store/actionCreators/categoryActions"
import { createReview, getAllReviews } from "shared/config/store/actionCreators/reviewActions"
import { selectUserData } from "shared/config/store/reducers/AuthSlice"
import { selectCategories } from "shared/config/store/reducers/CategorySlice"
import { selectReviews } from "shared/config/store/reducers/ReviewSlice"
import { CategoriesBox } from "widgets/CategoriesBox/CategoriesBox"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { EntityCreator } from "widgets/EntityCreator/EntityCreator"

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllReviews())
    },[])

    const categories = useSelector(selectCategories)
    const reviews = useSelector(selectReviews)
    const authorization = useSelector(selectUserData)
    const userId = authorization && authorization.id

    const buttons = [
        {
            title: 'Кнопка1',
            action: (e) => {
                e.preventDefault()
            }
        },
        {
            title: 'Кнопка2',
            action: (e) => {
                e.preventDefault()
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "Автор": {
            elemClass: listItemElementsClasses.AUTHOR,
            data: fields.author.nickname ?? fields.author.email
        },
        "Надежость": {
            elemClass: listItemElementsClasses.RATE,
            data: fields.reliability.toFixed(1)
        }
    })

    return (
        <div>
            <CategoriesBox/>
            <EntityCreator 
                title={'Написать отзыв'}
                fields={[
                    { 
                        type: 'text',
                        placeholder: 'Заголовок отзыва',
                        upperLabel: 'Заголовок отзыва'
                    },
                    { 
                        type: 'select',
                        placeholder: [
                            'Выберите категорию',
                            ...categories.map(category => category.title)
                        ],
                        upperLabel: "Выберите категорию"
                    },
                    { 
                        type: 'file',
                        placeholder: 'Картинка'
                    },
                    {
                        type: 'textarea',
                        placeholder: 'Текст отзыва',
                        upperLabel: 'Текст отзыва'
                    }
                ]}
                action={(title, category, picture, content) =>
                    dispatch(createReview(title, content, userId, category, picture))
                }
                buttonText={'Опубликовать'}
            />
            <DataContainer
                buttons={buttons}
                data={reviews}
                dataTransformer={dataTransformer}
                listTheme={listItemThemes.SQUARE}
                itemsOnClick={(itemData) => navigate(`/review/${itemData.id}`)}
                getTitleField={(itemData) => itemData.title}
            />
        </div>
    )
}