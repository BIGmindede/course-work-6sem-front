import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { selectSidebarCollapsed } from 'shared/config/store/reducers/SidebarSlice'
import { Link } from 'react-router-dom'
import { routesPaths } from 'shared/config/router/routerPaths'
import CategoriesIcon from 'shared/assets/CategoriesIcon.svg?react'
import ReviewsIcon from 'shared/assets/ReviewsIcon.svg?react'
import UsersIcon from 'shared/assets/UsersIcon.svg?react'
import RequestsIcon from 'shared/assets/RequestsIcon.svg?react'
import ComplaintsIcon from 'shared/assets/ComplaintsIcon.svg?react'


export default () => {

    const collapsed = useSelector(selectSidebarCollapsed)

    return (
        <div className={useClassNames(cls.sidebar, [collapsed ? cls.collapsed : cls.opened])}>
            <ul>
                <Link to={routesPaths.categories}>
                    <li>
                        <CategoriesIcon/>
                        <span>Категории</span>
                    </li>
                </Link>
                <Link to={routesPaths.reviews}>
                    <li>
                        <ReviewsIcon/>
                        <span>Отзывы</span>
                    </li>
                </Link>
                <Link to={routesPaths.users}>
                    <li>
                        <UsersIcon/>
                        <span>Пользователи</span>
                    </li>
                </Link>
                <Link to={routesPaths.requests}>
                    <li>
                        <RequestsIcon/>
                        <span>Заявки</span>
                    </li>
                </Link>
                <Link to={routesPaths.complaints}>
                    <li>
                        <ComplaintsIcon/>
                        <span>Жалобы</span>
                    </li>
                </Link>
            </ul>
            
        </div>
    )
}