import { useContext, useEffect} from 'react'
import requestApi from '../../api/tmdb_api_config'
import { useParams } from 'react-router'
import MovieHero from '../../Components/MediaHero/Movie_content/movie_content'
import MovieInformation from './Movie_Information/movie_information'
import { CurrentIdContext } from '../../Context/current_id_context/current_id'


const MovieDetails = () => {
    const { uid } = useParams()

    const { result, setResult, iframeKey, setIframeKey, show, setShow } = useContext(CurrentIdContext)

    useEffect(() => {
        const movieDetails = async () => {
            try {
                if (Number(uid) > 0) {
                    const { data } = await requestApi.movieDetails(Number(uid))
                    setResult(data)
                }
            } catch (error) {
                //ignore for now
            }
        }
        movieDetails()
    }, [uid])


    const {
        id
    }: any = result


    return (
        <>
            {
                id && <>
                    <MovieHero
                        result={result}
                        iframeKey={iframeKey}
                        show={show}
                    />
                    <MovieInformation
                        result={result}
                        iframeKey={iframeKey}
                        setIframeKey={setIframeKey}
                        show={show}
                        setShow={setShow}
                    />
                </>
            }
        </>
    )
}

export default MovieDetails