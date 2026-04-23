import './App.css'
import MovieCard from './components/MovieCard';

// // 注入到index.html的组件
// function App() {
//     return (
//       // 组件必须含有父元素，所以必须使用 <div></div> 或者<><> 进行包裹内部元素
//       // <div>
//       //     <p>Hello World!</p>
//       // </div>
//       <div>
//         <Text display="Hello World"/>
//         <Text display="How are you?"/>
//       </div>
//     );
// }
//
// // 组件接受一个对象prop，通过解构得到对象的对应属性
// function Text({display}) {
//     return <p>{display}</p>;
// }

function App() {
    return (
        <div>
            <MovieCard movie={
                {
                    title: "当幸福来敲门",
                    release_date: "2020-05-01",
                    url: "https://api.themoviedb.org/3/movies/",
                }
            }/>
        </div>
    )
}

export default App
