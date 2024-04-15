import { useDispatch } from 'react-redux'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { changeCollapsed } from 'shared/config/store/reducers/SidebarSlice'
import AdminToolsIcon from 'shared/assets/icons/AdminToolsIcon.svg?react'

export default () => {

    const dispatch = useDispatch()
    
    const handleSidebarTogglerToggle = () => {
        dispatch(changeCollapsed())
    }

    
    return (
        <Button action={handleSidebarTogglerToggle} className={ButtonThemes.CLEAR}>
            <AdminToolsIcon/>
        </Button>
    )
}