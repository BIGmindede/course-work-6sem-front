import { useState } from "react"
import { STATIC_URL } from "shared/config/http"
import PictureNotFoundIcon from 'shared/assets/icons/PictureNotFoundIcon.svg?react'
import cls from './Img.module.scss'
import { useClassNames } from "shared/lib/useClassNames"
export const Img = ({ imageId, className }) => {

    const [image, setImage] = useState(`${STATIC_URL}/${imageId}`)
    const [notFound, setNotFound] = useState(false)
    const classname = useClassNames(cls.img, [className, !notFound && cls.stub])

    return (
        <>
        {!notFound
            ? <img
                className={classname}
                src={image}
                onError={(e) => {
                    e.target.onError = null
                    setImage('pictureNotFound.jpg')
                    setNotFound(true)
                }}
                alt=""
            />
            : <div className={classname}>
                <PictureNotFoundIcon/>
            </div>
        }
        </>
    )
}