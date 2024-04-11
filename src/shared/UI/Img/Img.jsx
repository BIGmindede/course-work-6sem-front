import { STATIC_URL } from "shared/config/http"

export const Img = ({ imageId }) => {
    
    return (
        <img src={`${STATIC_URL}/${imageId}`} alt="" />
    )
}