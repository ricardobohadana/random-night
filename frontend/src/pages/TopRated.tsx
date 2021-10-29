import React, { useEffect, useState } from "react";
import BestTable from "../components/BestTable/BestTable";
import { TV } from "../api/FoodAndBeverages";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { domain_url } from "../api/url";

const TopRated: React.FC = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<TV[]>([]);
  const [topRatedTvShow, setTopRatedTvShow] = useState<TV[]>([]);
  const [isLoading1, setIsLoading1] = useState<boolean>(true);
  const [isLoading2, setIsLoading2] = useState<boolean>(true);

  useEffect(() => {
    const topRatedMovieUrl = `${domain_url}api/topRatedMovie`;
    const topRatedTvShowUrl = `${domain_url}api/topRatedTvShow`;
    fetch(topRatedMovieUrl)
      .then((r) => r.json())
      .then((data) => setTopRatedMovie(data))
      .then(() => setIsLoading1(false));
    fetch(topRatedTvShowUrl)
      .then((r) => r.json())
      .then((data) => setTopRatedTvShow(data))
      .then(() => setIsLoading2(false));
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

  const containerHeight = [isLoading1, isLoading2].some((v) => v === true)
    ? "92.2vh"
    : "100%";

  return (
    <Container style={{ height: containerHeight }}>
      <Row className="pt-5">
        <Col>
          {isLoading1 ? (
            loadingSpinner
          ) : (
            <BestTable isMovie data={topRatedMovie} />
          )}
        </Col>
        <Col>
          {isLoading2 ? loadingSpinner : <BestTable data={topRatedTvShow} />}
        </Col>
      </Row>
    </Container>
  );
};

export default TopRated;
