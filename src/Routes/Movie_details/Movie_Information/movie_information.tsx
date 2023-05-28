import React, { useEffect, useState } from 'react'
import styles from './movie_infomation.module.scss'
import Container from '../../../Components/Container/container'
import requestApi from '../../../api/tmdb_api_config'
import DisplayCard from '../../../Components/Display_card/display_card'
import CardsWrapper from '../../../Components/Cards_wrapper/cards_wrapper'
import BaseInformation from './Base_information/base_information'

type Info = {
    id: number,
    original_language: string,
    budget: string,
    revenue: string,
    release_date: string,
    popularity: number,
    homepage: string,
    iframeKey: string,
    setIframeKey: React.Dispatch<React.SetStateAction<string>>,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>

}

const MovieInformation = ({
    id,
    original_language,
    budget,
    revenue,
    release_date,
    homepage,
    popularity,
    iframeKey,
    setIframeKey,
    show,
    setShow
}: Info) => {
    const [result, setResult] = useState<[]>([])
    const [videoLink, setVideoLink] = useState<[]>([])


    useEffect(() => {
        const casts = async () => {
            try {
                const { data } = await requestApi.movieInfo(id, 'credits')
                setResult(data.cast)

            } catch (error) {

            }
        }
        casts()
    }, [])

    useEffect(() => {
        const teaser = async () => {
            try {
                const { data } = await requestApi.movieInfo(id, 'videos')
                setVideoLink(data.results)
            } catch (error) {
                //
            }
        }
        teaser()
    }, [id])


    return (
        <div>
            <Container>
                <div className={styles.MovieInfo}>
                    <p className={`${styles.head} HeadingsAlt`}>Media</p>
                    <div className={styles.top}>
                        <BaseInformation videoLink={videoLink}
                            show={show}
                            setShow={setShow}
                            iframeKey={iframeKey}
                            setIframeKey={setIframeKey} />
                    </div>
                    <p className={`${styles.cas} HeadingsAlt`}>Casts</p>
                    <div className={styles.bottom}>
                        <div className={styles.wrapper}>
                            <CardsWrapper id='casts'>
                                <DisplayCard result={result} typeOfMedia='person' />
                            </CardsWrapper>
                        </div>
                        <div className={styles.others}>money</div>
                    </div>


                </div>
            </Container>
        </div>
    )
}

export default MovieInformation