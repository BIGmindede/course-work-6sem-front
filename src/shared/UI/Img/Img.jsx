export const Img = ({ imageId }) => {
    return (
        <img src={`http://localhost:5000/${imageId}`} alt="" />
    )
}