import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import TopFiveTable from "../components/TopFiveTable/TopFiveTable";
import { TV } from "../api/FoodAndBeverages";
import { domain_url } from "../api/url";

const Home: React.FC = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<TV[]>([]);
  const [topRatedTvShow, setTopRatedTvShow] = useState<TV[]>([]);
  const [mostPopularMovie, setMostPopularMovie] = useState<TV[]>([]);
  const [mostPopularTvShow, setMostPopularTvShow] = useState<TV[]>([]);
  const [isLoading1, setIsLoading1] = useState<boolean>(true);
  const [isLoading2, setIsLoading2] = useState<boolean>(true);
  const [isLoading3, setIsLoading3] = useState<boolean>(true);
  const [isLoading4, setIsLoading4] = useState<boolean>(true);

  useEffect(() => {
    const topRatedMovieUrl = `${domain_url}api/topRatedMovie`;
    const topRatedTvShowUrl = `${domain_url}api/topRatedTvShow`;
    const mostPopularMovieUrl = `${domain_url}/api/mostPopularMovie`;
    const mostPopularTvShowUrl = `${domain_url}/api/mostPopularTvShow`;
    fetch(topRatedMovieUrl)
      .then((r) => r.json())
      .then((data) => setTopRatedMovie(data))
      .then(() => setIsLoading1(false));
    fetch(topRatedTvShowUrl)
      .then((r) => r.json())
      .then((data) => setTopRatedTvShow(data))
      .then(() => setIsLoading2(false));
    fetch(mostPopularMovieUrl)
      .then((r) => r.json())
      .then((data) => setMostPopularMovie(data))
      .then(() => setIsLoading3(false));
    fetch(mostPopularTvShowUrl)
      .then((r) => r.json())
      .then((data) => setMostPopularTvShow(data))
      .then(() => setIsLoading4(false));
  }, []);

  const loadingSpinner = (
    <div
      className="d-flex justify-content-center my-5"
      style={{ overflow: "hidden" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const containerHeight = [isLoading1, isLoading2, isLoading3, isLoading4].some(
    (v) => v === true
  )
    ? "92.2vh"
    : "100%";

  return (
    <Container style={{ height: containerHeight }}>
      <Row className="pt-5">
        <Col sm lg={6}>
          {isLoading1 ? (
            loadingSpinner
          ) : (
            <TopFiveTable isMovie isPopular data={mostPopularMovie} />
          )}
        </Col>
        <Col sm lg={6}>
          {isLoading2 ? (
            loadingSpinner
          ) : (
            <TopFiveTable isMovie data={topRatedMovie} />
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm lg={6}>
          {isLoading3 ? (
            loadingSpinner
          ) : (
            <TopFiveTable isPopular data={mostPopularTvShow} />
          )}
        </Col>
        <Col sm lg={6}>
          {isLoading4 ? loadingSpinner : <TopFiveTable data={topRatedTvShow} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
