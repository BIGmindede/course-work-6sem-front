import UploadFileIcon from 'shared/assets/UploadFileIcon.svg?react'
import cls from './Input.module.scss'
import { truncate } from 'shared/lib/truncate'

export const Input = ({ type, placeholder, inputValue, setInputValue }) => {

    return (
        type === "file"
            ? <>
                <input
                    className={cls.fileinput} type={type}
                    name='fileloader' id='fileloader'
                    onChange={(e) => setInputValue(e.target.files[0])}
                />
                <label id='fileInputLabel' className={cls.inputlabel} htmlFor='fileloader'>
                    <span>
                        {inputValue !== placeholder && inputValue !== undefined
                            ? <>
                                <span>{truncate(inputValue.name)[0]}</span>
                                <hr />
                                <span>{truncate(inputValue.name)[1]}</span>
                            </>
                            : <>
                                <UploadFileIcon/>
                                {inputValue}
                            </>
                        }
                    </span>
                </label>
            </>
            : <input
                className={cls.input} type={type}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue !== placeholder ? inputValue : ''}
            />
    )
}
