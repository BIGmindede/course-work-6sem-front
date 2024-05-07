import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { selectSidebarCollapsed } from 'shared/config/store/reducers/SidebarSlice'
import { Link } from 'react-router-dom'
import CategoriesIcon from 'shared/assets/icons/CategoriesIcon.svg?react'
import ReviewsIcon from 'shared/assets/icons/ReviewsIcon.svg?react'
import UsersIcon from 'shared/assets/icons/UsersIcon.svg?react'
import RequestsIcon from 'shared/assets/icons/RequestsIcon.svg?react'
import ComplaintsIcon from 'shared/assets/icons/ComplaintsIcon.svg?react'
import { routesPaths } from 'app/providers/routesProvider/config/routerConfig'


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
                </Link><hr />
                <Link to={routesPaths.reviews}>
                    <li>
                        <ReviewsIcon/>
                        <span>Отзывы</span>
                    </li>
                </Link><hr />
                <Link to={routesPaths.users}>
                    <li>
                        <UsersIcon/>
                        <span>Пользователи</span>
                    </li>
                </Link><hr />
                <Link to={routesPaths.requests}>
                    <li>
                        <RequestsIcon/>
                        <span>Заявки</span>
                    </li>
                </Link><hr />
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