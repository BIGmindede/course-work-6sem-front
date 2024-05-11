import { useState } from "react"
import { STATIC_URL } from "shared/config/http"
import PictureNotFoundIcon from 'shared/assets/icons/PictureNotFoundIcon.svg?react'
import cls from './Img.module.scss'
import { useClassNames } from "shared/lib/useClassNames"
export const Img = ({ imageId, className }) => {

    const [image, setImage] = useState(`${STATIC_URL}/${imageId}`)
    const [notFound, setNotFound] = useState(false)
    const imageClassName = useClassNames((notFound || !imageId) && cls.stub, [className])

    return (
        <>
        {!notFound && imageId
            ? <img
                className={imageClassName}
                src={image}
                onError={(e) => {
                    e.target.onError = null
                    setNotFound(true)
                }}
                alt=""
            />
            : <div className={imageClassName}>
                <PictureNotFoundIcon/>
            </div>
        }
        </>
    )
}