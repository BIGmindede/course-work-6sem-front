import { useClassNames } from 'shared/lib/useClassNames'
import cls from './CategoriesBox.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories } from 'shared/config/store/reducers/CategorySlice'
import { getAllCategories } from 'shared/config/store/actionCreators/categoryActions'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { truncate } from 'shared/lib/truncate'
import { Img } from 'shared/UI/Img/Img'
import { getFiltersQuery } from 'shared/lib/getFiltersQuery'

export const CategoriesBox = ({ className }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const categories = useSelector(selectCategories)

    return (
        <div className={useClassNames(cls.categoriesbox, [cls[className]])}>
            {categories.map(category => 
                <Link key={category.id} to={`/search?${getFiltersQuery({category: category.title})}`}>
                    <div className={cls.categorywrapper}>
                        <div className={cls.imagewrapper}>
                            <Img imageId={category.pictureName}/>
                        </div>
                        <div className={cls.categorytitle}>{truncate(category.title, 18)}</div>
                    </div>
                </Link>
            )}
        </div>
    )
}