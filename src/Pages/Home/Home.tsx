import { useEffect, useState } from "react"
import requestApi from "../../api/tmdb_api_config"
import styles from './home.module.scss'
import Hero from "./Hero_section/hero"
import Trending from "./Trending_section/trending"
import TopMovies from "./Top_movies/top_movies"
import TvOnair from "./Tv/tv_onair"
import ComingSoon from "./Coming_soon/coming_soon"
import Animated from "../../Components/AnimatedRoutes/animated"

const Home = () => {
  const [trending, setTrending] = useState<string>('movie')
  const [trendingPeriod, setTrendingPeriod] = useState<string>('day')
  const [result, setResult] = useState<[]>([])
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    const Trending = async () => {
      try {
        const { data } = await requestApi.trending(trending, trendingPeriod)
        setResult(data.results)
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
      }
    }
    Trending()
  }, [trending, trendingPeriod])


  return (
    <div className={styles.home}>
      <Animated home="home">
        <Hero
          result={result}
          current={current} setCurrent={setCurrent}
        />
        <Trending
          trending={trending} setTrending={setTrending}
          trendingPeriod={trendingPeriod} setTrendingPeriod={setTrendingPeriod}
          result={result}
        />
        <TopMovies />
        <TvOnair />
        <ComingSoon />
      </Animated>
    </div>
  )
}

export default Home