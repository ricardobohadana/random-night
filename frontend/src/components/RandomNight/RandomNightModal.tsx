import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { mostPopularMovies } from "../../api/MostPopularMovies";
import { mostPopularTvShows } from "../../api/MostPopularTvShows";
import { topRatedMovies } from "../../api/TopRatedMovies";
import { topRatedTvShows } from "../../api/TopRatedTvShows";
import { Food, Beverage, FB, TV } from "../../api/FoodAndBeverages";
import BestTable from "../BestTable/BestTable";

interface Props {
  show: boolean;
  media: number;
}

const RandomNightModal = ({ show, media }: Props) => {
  const [randomMedia, setRandomMedia] = useState<TV>({
    Id: "",
    Poster: "",
    Rating: "",
    Title: "",
  });

  const [randomFood, setRandomFood] = useState<FB>({
    name: "",
    url: "",
  });
  const [randomBeverage, setRandomBeverage] = useState<FB>({
    name: "",
    url: "",
  });

  const handleGenerator = useCallback(() => {
    const allMedia =
      media === 0
        ? mostPopularMovies.concat(
            mostPopularTvShows,
            topRatedMovies,
            topRatedTvShows
          )
        : media === 1
        ? mostPopularMovies.concat(topRatedMovies)
        : mostPopularTvShows.concat(topRatedTvShows);

    let finished = false;

    while (!finished) {
      let randomObject = allMedia[Math.floor(Math.random() * allMedia.length)];
      let randomF = Food[Math.floor(Math.random() * Food.length)];
      let randomB = Beverage[Math.floor(Math.random() * Beverage.length)];
      console.log(randomObject);
      setRandomMedia(randomObject);
      setRandomFood(randomF);
      setRandomBeverage(randomB);
      finished = true;
    }
  }, [media]);

  useEffect(() => {
    handleGenerator();
  }, [handleGenerator]);

  const title = media === 0 ? "Title" : media === 1 ? "Movie" : "TV Show";

  return show ? (
    <Container>
      <Stack>
        {randomMedia.Poster === "" ? null : (
          <>
            <BestTable title={title} data={[randomMedia]} />
            <Container fluid className="d-flex justify-content-around">
              <div>
                <img
                  alt={randomFood.name}
                  style={{
                    height: 256,
                    width: 256,
                  }}
                  src={randomFood.url}
                />
                <h3 className="d-flex justify-content-center">
                  {randomFood.name}
                </h3>
              </div>
              <div>
                {/* <Container fluid className="d-flex"> */}
                <img
                  alt={randomBeverage.name}
                  style={{
                    height: 256,
                    width: 256,
                  }}
                  src={randomBeverage.url}
                />
                <h3 className="d-flex justify-content-center">
                  {randomBeverage.name}
                </h3>
              </div>
            </Container>
            {/* </Container> */}
          </>
        )}

        <Button
          variant="outline-light mt-2"
          style={{ width: "100%" }}
          onClick={() => handleGenerator()}
        >
          Reroll
        </Button>
      </Stack>
    </Container>
  ) : null;
};

export default RandomNightModal;
