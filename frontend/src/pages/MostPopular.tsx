import React, { useEffect, useState } from "react";
import BestTable from "../components/BestTable/BestTable";
import { TV } from "../api/FoodAndBeverages";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { domain_url } from "../api/url";

const MostPopular: React.FC = () => {
  const [mostPopularMovie, setMostPopularMovie] = useState<TV[]>([]);
  const [mostPopularTvShow, setMostPopularTvShow] = useState<TV[]>([]);
  const [isLoading1, setIsLoading1] = useState<boolean>(true);
  const [isLoading2, setIsLoading2] = useState<boolean>(true);

  useEffect(() => {
    const mostPopularMovieUrl = `${domain_url}/api/mostPopularMovie`;
    const mostPopularTvShowUrl = `${domain_url}/api/mostPopularTvShow`;
    fetch(mostPopularMovieUrl)
      .then((r) => r.json())
      .then((data) => setMostPopularMovie(data))
      .then(() => setIsLoading1(false));
    fetch(mostPopularTvShowUrl)
      .then((r) => r.json())
      .then((data) => setMostPopularTvShow(data))
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
            <BestTable isMovie isPopular data={mostPopularMovie} />
          )}
        </Col>
        <Col>
          {isLoading2 ? (
            loadingSpinner
          ) : (
            <BestTable isPopular data={mostPopularTvShow} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MostPopular;
