import MovieItem from "./MovieItem";
// import dummyData from '../static/dummyData.json'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import SliderMovieItem from './SliderMovieItem';
import Loading from "./Loading";

export default function RelatedMovieList() {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState(null);
  // const [slicedList, setSlicedList] = useState(null);

  const params = useParams();
  const RELATED_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(RELATED_API)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setMovieList(result.slice(0,10));
      })
      .catch((e) => console.log(e));
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movieList.length - 1));
  };


  if (movieList === null) {
    return <div><Loading /></div>;
  } else {
    return (
      <div className="movieList" >
        <h2 className="genreTitle">연관된영화</h2>
        <div className="slider__container">
          <button className="slider__btn" onClick={handlePrevClick} disabled={currentIndex === 0}><i class="fa-solid fa-arrow-left"></i></button>
          <div className="movieList__content__slider__related">
            <div className="movieList__slider" style={{ transform: `translateX(-${currentIndex * 188}px)` }}>
             {movieList.map((movie, index) => (
                <SliderMovieItem movie={movie} key={movie.id} />
              ))}
            </div>
            
          </div>
          <button className="slider__btn" onClick={handleNextClick} disabled={currentIndex === movieList.length - 7}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    );
  }
}
