import MovieItem from "./MovieItem";
// import dummyData from '../static/dummyData.json'
import { useState, useEffect } from "react";
import SliderMovieItem from './SliderMovieItem';

export default function MovieGenresList({ genreIds, categoryTitle }) {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState(null);
 
  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${genreIds}`;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movieList.data.length - 1));
  };


  if (movieList === null) {
    return <div></div>;
  } else {
    return (
      <div className="movieList">
        <h2 className="genreTitle">{categoryTitle}</h2>
        <div className="slider__container">
          <button className="slider__btn" onClick={handlePrevClick} disabled={currentIndex === 0}><i class="fa-solid fa-arrow-left"></i></button>
          <div className="movieList__content_slider">
            <div className="movieList__slider" style={{ transform: `translateX(-${currentIndex * 188}px)` }}>
             {movieList.data.map((movie, index) => (
                <SliderMovieItem movie={movie} key={movie.id} />
              ))}
            </div>
            
          </div>
          <button className="slider__btn" onClick={handleNextClick} disabled={currentIndex === movieList.data.length - 7}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    );
  }
}
