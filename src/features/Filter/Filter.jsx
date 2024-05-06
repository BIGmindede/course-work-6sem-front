import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Filter.module.scss'
import { Input } from 'shared/UI/Input/Input'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'

export const Filter = ({ className, filtersParams, filters, setFilters }) => {

    return (
        <div className={useClassNames(cls.filter, [cls[className]])}>
            {Object.keys(filtersParams).map(filter => {
                
                return <Input
                    key={filter}
                    type={filtersParams[filter].type}
                    setInputValue={value => setFilters({...filters, [filter]: value})}
                    inputValue={filters[filter] ?? filtersParams[filter].initial}
                    upperLabel={filtersParams[filter].type === 'range'
                        ? filtersParams[filter].upperLabel + (filters[filter] ?? filtersParams[filter].initial)
                        : filtersParams[filter].upperLabel
                    }
                    range={filtersParams[filter].range}
                    placeholder={filtersParams[filter].placeholder}
                />
            })}
        </div>
    )
}