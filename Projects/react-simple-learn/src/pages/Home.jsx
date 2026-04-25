import "../css/Home.css"

// 首页页面
// 搜索表单

import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect} from "react";
import {getPopularMovies, searchMovies} from "../services/api.js";

function Home() {
    // 获取state相关变量
    // state更新就会导致组件重新渲染
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect 声明当deps中的参数发生变化时，执行effect中的函数
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err){
                console.log(err);
                setError("请求第三方API失败！");
            } finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, []);

    // const movies = [
    //     {
    //         id: 1,
    //         title: "当幸福来敲门",
    //         release_date: "2019-02-02",
    //     },
    //     {
    //         id: 2,
    //         title: "导火线",
    //         release_date: "2019-09-02",
    //     },
    //     {
    //         id: 3,
    //         title: "楚门的世界",
    //         release_date: "2009-02-02",
    //     },
    //     {
    //         id: 4,
    //         title: "终结者",
    //         release_date: "1999-08-02",
    //     }
    // ];

    // 如果将获取热门电影的方法写在这里，组件每次渲染都会导致重新发送请求，这并不是一种好的做法
    // 因此，在这里引出useEffect Hook
    // const movies = getPopularMovies();

    const onMovieSearch = async (e) => {
        // 不阻止表单的默认行为，会导致input中的元素消失。默认情况下，提交表单会导致页面刷新
        e.preventDefault();
        // alert("你搜索了电影——" + searchQuery)
        if (!searchQuery.trim()) {
            return;
        }
        // 如果在加载，则无法进行搜索
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch(err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
        setSearchQuery("");
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={onMovieSearch}>
                <input type={"text"} placeholder={"查找电影"} className={"search-input"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className={"search-btn"} type={"submit"}>查找</button>
            </form>

            {loading && <p>加载中...</p>}
            {error && <p>{error}</p>}

            <div className="movies-grid">
                {movies.map(movie => (
                    // 动态加载组件，一定需要添加key属性，让React可以识别具体的组件
                    // <MovieCard movie={movie} key={movie.id}></MovieCard>

                    // 对组件进行选择渲染
                    // 初试searchQuery是""，所有组件都可以成功渲染，输入input之后，就会进行选择渲染了
                    // 下面的&&是利用了js对短路原理进行选择渲染的
                    movie.title.startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

        </div>
    );
}

export default Home;