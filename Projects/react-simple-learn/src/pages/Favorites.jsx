import "../css/Favorites.css"

function Favorites() {
    return (
        <div className={"favorites-empty"}>
            <h2>没有点赞的电影</h2>
            <p>你可以对电影进行点赞，点赞的电影会出现在这里</p>
        </div>
    )
}

export default Favorites;