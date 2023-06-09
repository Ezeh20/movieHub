import apiConfig from '../../../../api/api_config'
import styles from './content.module.scss'
import Rating from '../../../../Components/Rating/rating';
import Button from '../../../../Components/Button/button';
import { BsArrowBarRight } from "react-icons/bs";
import { useNavigate } from 'react-router';

type Props = {
    id: number,
    rating: number,
    original_title: string,
    poster_path: string,
    overview: string,
    name: string,
    genreArr: [],
    media_type: string,
}

const Info = (props: Props) => {
    const { poster_path, rating, original_title, overview, genreArr, name, id, media_type } = props

    const nav = useNavigate()
    /**
     * navigate to the movie/tv details page while using the media name as the path(without whitespace)
     * if original_title(movie) is undifined use the name(tv) it can either be any of them as they indicate
     * the current trending call from the api (movie || tv)
     * pass the id of the current media which will be used to make a caall in the details page
     */
    const navigate = (id: number, mediaType: string) => {
        nav(`/${mediaType}/${id}`, { state: id })
    }

    return (
        <div
            className={styles.content}>
            <img
                src={apiConfig.small(poster_path)} alt="poster" className={styles.poster} />
            <div
                className={styles.Info}>
                <div className={styles.rating}>
                    <Rating rating={rating} />
                </div>
                {
                    original_title ? <p className={styles.title}>{original_title}</p> :
                        <p className={styles.title}>{name}</p>
                }
                <p className={styles.overView}>{overview}</p>
                <div className={styles.genre}>
                    {
                        genreArr.map(itm => {
                            const { id, name } = itm
                            return (
                                <div key={id} className={styles.genreLists}>
                                    <p>{name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.btn}>
                    <Button type='button' btnType='' onClick={() => navigate(id, media_type)}>
                        view
                        <BsArrowBarRight className={styles.icn} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Info