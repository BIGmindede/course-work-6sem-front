import { useClassNames } from 'shared/lib/useClassNames'
import cls from './SearchBox.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { DialogWindow } from 'features/DialogWindow/DialogWindow'
import { useEffect, useState } from 'react'
import { Filter } from 'features/Filter/Filter'
import SearchIcon from 'shared/assets/icons/SearchIcon.svg?react'
import { transformDate } from 'shared/lib/transformDate'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from 'shared/config/store/actionCreators/categoryActions'
import { selectCategories } from 'shared/config/store/reducers/CategorySlice'
import { getFiltersQuery } from 'shared/lib/getFiltersQuery'
import { useNavigate } from 'react-router-dom'

export const SearchBox = ({ className }) => {
    const [filtersDropped, setFiltersDropped] = useState(false)
    const [filters, setFilters] = useState({
        maxDate: transformDate(new Date(), 'kebab')
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCategories())
    },[])

    const { categoriesList, loading } = useSelector(selectCategories)

    const processOrderBy = (type) => {
        switch (type) {
            case "По заголовку (АБВ...)":
                return "title_asc"
            case "По заголовку (...ЭЮЯ)":
                return "title_desc"
            case "По возрастанию оценки":
                return "mark_asc"
            case "По убыванию оценки":
                return "mark_desc"
            case "По дате (новее)":
                return "date_asc"
            case "По дате (старее)":
                return "date_desc"
            default:
                return undefined
        }
    }

    const filtersParams = {
        minDate: {
            type: "date",
            upperLabel: "Дата публикации от: "
        },
        minMark: {
            type: "range",
            upperLabel: "Средняя оценка от: ",
            initial: 0,
            range: {min: 0, step: 1, max: 5}
        },
        maxDate: {
            type: "date",
            upperLabel: "Дата публикации до: ",
            initial: filters.maxDate
        },
        category: {
            type: "select",
            upperLabel: "Категория",
            initial: "Выберите категорию",
            placeholder: [
                "Выберите категорию",
                ...categoriesList.map(category => category.title)
            ]
        },
        orderBy: {
            type: "select",
            upperLabel: "Сортировка",
            initial: "Сортировать по",
            placeholder: [
                "Сортировать по",
                "По заголовку (АБВ...)",
                "По заголовку (...ЭЮЯ)",
                "По возрастанию оценки",
                "По убыванию оценки",
                "По дате (новее)",
                "По дате (старее)"
            ]
        }
    }

    return (
        <form className={useClassNames(cls.searchbox, [cls[className]])}>
            <Button className={ButtonThemes.ALFA}
                action={(e) => {
                    e.preventDefault()
                    setFiltersDropped(state => !state)
                }}
            >Фильтры</Button>
            <input 
                type="text"
                onChange={(e) => {setFilters({...filters, title: e.target.value})}}    
            />
            <Button 
                className={ButtonThemes.ALFA}
                action={(e) => {
                    e.preventDefault()
                    const query = getFiltersQuery({
                        title: filters.title,
                        minMark: filters.minMark ?? 0,
                        minDate: filters.minDate,
                        maxDate: filters.maxDate,
                        category: filters.category === "Выберите категорию" ? undefined : filters.category,
                        orderBy: processOrderBy(filters.orderBy)
                    })
                    setFiltersDropped(false)
                    navigate(`/search?${query}`)
                }}
            >
                <SearchIcon />
            </Button>
            {filtersDropped &&
                <DialogWindow
                    className="filtersdialogwindow"
                >
                    <Filter
                        filters={filters}
                        setFilters={setFilters}
                        filtersParams={filtersParams}
                    />
                </DialogWindow>
            }
        </form>
    )
}