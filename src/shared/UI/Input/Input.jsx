import UploadFileIcon from 'shared/assets/UploadFileIcon.svg?react'
import cls from './Input.module.scss'
import { truncate } from 'shared/lib/truncate'
import { divideFileName } from 'shared/lib/divideFileName'

export const Input = ({
    type,
    placeholder,
    inputValue,
    setInputValue,
    upperLabel,
    disabled
}) => {

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
                            <h4>{truncate(divideFileName(inputValue.name)[0], 12)}</h4>
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
    else if (type === 'select') return (
        <div className={cls.inputwrapper}>
            {upperLabel && (inputValue || disabled) &&
                <label className={cls.upperlabel}>{upperLabel}</label>
            }
            <div className={cls.select}>
                <label htmlFor={cls.checkbox}>
                    {truncate(inputValue === placeholder || inputValue === '' ? placeholder[0] : inputValue, 20)}
                </label>
                <input 
                    type='checkbox'
                    hidden 
                    disabled={disabled}
                    id={cls.checkbox}
                    className={cls.checkbox}
                />
                <ul>
                    {placeholder.map(option => 
                        <li key={option} onClick={(e) => {
                            setInputValue(e.target.innerText)
                        }}><label htmlFor={cls.checkbox} title={option.length > 17 ? option : false}>{truncate(option,17)}</label></li>
                    )}
                </ul>
            </div>
        </div>
    )
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
