import { useState } from "react"
import { STATIC_URL } from "shared/config/http"

export const Img = ({ imageId }) => {

    const [image, setImage] = useState(`${STATIC_URL}/${imageId}`)

    return (
        <img
            src={image}
            onError={(e) => {
                e.target.onError = null
                setImage('pictureNotFound.jpg')
            }}
            alt=""
        />
    )
}