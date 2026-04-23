import "./css/App.css";
import Home from "./pages/Home.jsx";
import {Routes, Route} from 'react-router-dom';
import Favorites from "./pages/Favorites.jsx";
import NavBar from "./components/NavBar.jsx";

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

// function App() {
//     return (
//         <div>
//             <MovieCard movie={
//                 {
//                     title: "当幸福来敲门",
//                     release_date: "2020-05-01",
//                     url: "https://api.themoviedb.org/3/movies/",
//                 }
//             }/>
//         </div>
//     )
// }


// React中要使用路由，需要执行 pnpm install react-router-dom 命令
function App() {
    return (
        <div>
            <NavBar />
            <main className="main-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </main>
        </div>
    );
}

export default App
