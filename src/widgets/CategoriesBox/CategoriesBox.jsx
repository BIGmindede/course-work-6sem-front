import { useClassNames } from 'shared/lib/useClassNames'
import cls from './CategoriesBox.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories } from 'shared/config/store/reducers/CategorySlice'
import { getAllCategories } from 'shared/config/store/actionCreators/categoryActions'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const CategoriesBox = ({ className }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const categories = useSelector(selectCategories)

    return (
        <div className={useClassNames(cls.categoriesbox, [cls[className]])}>
            {categories.map(category => 
                <Link key={category.id}>
                    <div className={cls.categorywrapper}>
                        <div className={cls.imagewrapper}>
                            <img src={`http://localhost:5000/${category.pictureName}`} alt="" />
                        </div>
                        <div className={cls.categorytitle}>{category.title}</div>
                    </div>
                </Link>
            )}
        </div>
    )
}