import UploadFileIcon from 'shared/assets/UploadFileIcon.svg?react'
import cls from './Input.module.scss'
import { truncate } from 'shared/lib/truncate'
import { divideFileName } from 'shared/lib/divideFileName'

export const Input = ({ type, placeholder, inputValue, setInputValue }) => {
    if (type === 'file') return (
        <>
            <input
                className={cls.fileinput} type={type}
                name='fileloader' id='fileloader'
                onChange={(e) => setInputValue(e.target.files[0])}
            />
            <label id='fileInputLabel' className={cls.fileinputlabel} htmlFor='fileloader'>
                <span>
                    {inputValue !== '' && inputValue !== undefined
                        ? <>
                            <h3>{truncate(divideFileName(inputValue.name)[0], 16)}</h3>
                            <hr />
                            <h3>{divideFileName(inputValue.name)[1]}</h3>
                        </>
                        : <>
                            <UploadFileIcon className={cls.uploadarrowicon}/>
                            <h3 className={cls.fileplaceholder}>{placeholder}</h3>
                        </>
                    }
                </span>
            </label>
        </>
    )
    else if (type === 'textarea') return (
        <textarea
            className={cls.textarea}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
        />
    )
    else if (type === 'select') {

        return (
        <div className={cls.select}>
            <label htmlFor={cls.checkbox}>
                {truncate(inputValue === placeholder || inputValue === '' ? placeholder[0] : inputValue, 20)}
            </label>
            <input type='checkbox' hidden id={cls.checkbox} className={cls.checkbox}/>
            <ul>
                {placeholder.map(option => 
                    <li key={option} onClick={(e) => {
                        setInputValue(e.target.innerText)
                    }}><label htmlFor={cls.checkbox}>{option}</label></li>
                )}
            </ul>
        </div>
    )}
    else return (
        <input
            className={cls.input} type={type}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
        />
    )
}
