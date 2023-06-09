/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import apiConfig from "../../../api/api_config"
import styles from './hero.module.scss'
import Container from "../../../Components/Container/container"
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import requestApi from "../../../api/tmdb_api_config";
import { heroType, Filter, Content } from "./type";
import Info from "./Content/content";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../../Components/Loading-spinner/loading";

const Hero = (props: heroType) => {
    const {
        result,
        current,
        setCurrent
    } = props


    const [autoPlay, setAutoPlay] = useState<boolean>(true)
    const [genre, setGenre] = useState<[]>([])
    let play: any = null;


    useEffect(() => {
        play = autoPlay ? setTimeout(() => {
            next()
        }, 7000) : ''
        return () => clearTimeout(play)
    })


    useEffect(() => {
        const genre = async () => {
            const req = requestApi.movieGenres('')
            const { genres } = await (await req).data
            setGenre(genres)
        }
        genre()
    }, [])




    //get the top n to be used in a slide show carousel 
    const top10 = result.slice(0, 10)
    //function to toggle the next showcase
    const next = () => {
        setCurrent(current === top10.length - 1 ? 0 : current + 1)
    }
    //function to toggle the prev showcase
    const prev = () => {
        setCurrent(current === 0 ? top10.length - 1 : current - 1)
    }

    return (
        <div className={styles.carousel}
            onMouseEnter={() => { setAutoPlay(false) }}
            onMouseLeave={() => setAutoPlay(true)}>

            {
                result.length > 0 ?
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: .2 } }}
                            transition={{ duration: .5 }}
                            key={current} className={styles.carouselContainer}>
                            {top10.map((item, idx) => {
                                const {
                                    backdrop_path,
                                    genre_ids,
                                    id,
                                    original_title,
                                    vote_average,
                                    poster_path,
                                    overview,
                                    name,
                                    media_type,
                                }: Content = item

                                const genreArr: [] = []
                                genre_ids && genre_ids.forEach((e: number) => {
                                    genre && genre.filter((itm: Filter) => itm.id === e).map(itm => genreArr.push(itm))
                                })

                                return (
                                    <div key={id} className={idx === current ? `${styles.hero} ${styles.heroActive}` : `${styles.hero}`}>
                                        <img src={apiConfig.originalImg(backdrop_path)} alt="backdrop" className={styles.backDrop}
                                        />
                                        <div className={styles.overlay}>
                                            <Container>
                                                <Info original_title={original_title}
                                                    poster_path={poster_path}
                                                    overview={overview}
                                                    rating={vote_average}
                                                    genreArr={genreArr}
                                                    name={name}
                                                    id={id}
                                                    media_type={media_type}
                                                />
                                            </Container>
                                        </div>

                                        <button onClick={prev} className={styles.btn}>
                                            <TbSquareRoundedArrowLeftFilled />
                                        </button>
                                        <button onClick={next} className={styles.btn2}>
                                            <TbSquareRoundedArrowRightFilled />
                                        </button>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>
                    : <Loading />
            }
        </div>
    )
}

export default Hero