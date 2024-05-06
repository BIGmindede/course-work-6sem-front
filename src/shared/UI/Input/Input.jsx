import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon.svg?react'
import UploadFileIcon from 'shared/assets/icons/UploadFileIcon.svg?react'
import cls from './Input.module.scss'
import { truncate } from 'shared/lib/truncate'
import { divideFileName } from 'shared/lib/divideFileName'
import { Themes, useTheme } from 'app/providers/themeProvider'

export const Input = ({
    type,
    placeholder,
    inputValue,
    setInputValue,
    upperLabel,
    disabled,
    range
}) => {
    const { theme } = useTheme()

    if (type === 'file') return (
        <div className={cls.inputwrapper}>
            <input
                className={cls.fileinput} type={type}
                name='fileloader' id='fileloader'
                onChange={(e) => setInputValue(e.target.files[0])}
                disabled={disabled}
            />
            <label id='fileInputLabel' className={cls.fileinputlabel} htmlFor='fileloader'>
                <span>
                    {inputValue !== '' && inputValue !== undefined
                        ? <>
                            <h4>{truncate(divideFileName(inputValue.name)[0], 20)}</h4>
                            <hr />
                            <h4>{divideFileName(inputValue.name)[1]}</h4>
                        </>
                        : <>
                            <UploadFileIcon className={cls.uploadarrowicon}/>
                            <h4 className={cls.fileplaceholder}>{placeholder}</h4>
                        </>
                    }
                </span>
            </label>
        </div>
    )
    else if (type === 'textarea') return (
        <div className={cls.textareawrapper}>
            {upperLabel && (inputValue || disabled) &&
                <label className={cls.upperlabel}>{upperLabel}</label>
            }
            <textarea
                className={cls.textarea}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                disabled={disabled}
            />
        </div>
        
    )
    else if (type === 'select') {
        return (
        <div className={cls.inputwrapper}>
            {upperLabel && (inputValue || disabled) &&
                <label className={cls.upperlabel}>{upperLabel}</label>
            }
            <div className={cls.select}>
                <ul className={cls.selectcollapsed}>
                    <span
                        className={cls.toggler}
                        disabled={disabled}
                        onClick={(e) => {
                            e.stopPropagation()
                            let list = e.target.parentNode
                            while (list.tagName !== 'UL') {
                                list = list.parentNode
                            }

                            if (list.className === cls.selectcollapsed) {
                                list.className = cls.selectexpanded
                            }
                            else {
                                list.className = cls.selectcollapsed
                            }
                        }}
                    >
                        {truncate(inputValue === placeholder[0] || inputValue === '' ? placeholder[0] : inputValue, 35)}
                        <ArrowDownIcon/>
                    </span>
                    {placeholder.map(option => {
                        return <li key={option}
                            onClick={(e) => {
                                const list = e.target.parentNode
                                if (list.className === cls.selectcollapsed) {
                                    list.className = cls.selectexpanded
                                }
                                else {
                                    list.className = cls.selectcollapsed
                                }
                                setInputValue(e.target.innerText)
                            }}
                        >
                            {truncate(option,35)}
                        </li>
                    }   
                    )}
                </ul>
            </div>
        </div>
    )}
    else if (type === 'range') {
        return (
            <div className={cls.inputwrapper}>
                <label
                    className={cls.upperlabel}
                >{upperLabel}</label>
                <input
                    value={inputValue}
                    className={cls.range}
                    type="range"
                    min={range.min} step={range.step} max={range.max}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                />
            </div>
        )
    }
    else if (type === 'date') {
        
        return (
            <div className={cls.inputwrapper}>
                <label
                    className={cls.upperlabel}
                >{upperLabel}</label>
                <input
                    style={{colorScheme: theme === Themes.DARK ? 'dark' : 'light'}}
                    value={inputValue}
                    className={cls.date}
                    type="date"
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                />
            </div>
        )
    }
    else return (
        <div className={cls.inputwrapper}>
            {upperLabel && (inputValue || disabled) &&
                <label className={cls.upperlabel}>{upperLabel}</label>
            }
            <input
                className={cls.input}
                type={type}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                disabled={disabled}
                autoComplete='on'
            />
        </div>
    )
}
