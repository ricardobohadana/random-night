import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopFiveTable from "../components/TopFiveTable/TopFiveTable";
import { mostPopularMovies } from "../api/MostPopularMovies";
import { topRatedMovies } from "../api/TopRatedMovies";
import { topRatedTvShows } from "../api/TopRatedTvShows";
import { mostPopularTvShows } from "../api/MostPopularTvShows";

const Home: React.FC = () => {
  return (
    <Container>
      <Row className="pt-5">
        <Col sm lg={6}>
          <TopFiveTable isMovie isPopular data={mostPopularMovies} />
        </Col>
        <Col sm lg={6}>
          <TopFiveTable isMovie data={topRatedMovies} />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm lg={6}>
          <TopFiveTable isPopular data={mostPopularTvShows} />
        </Col>
        <Col sm lg={6}>
          <TopFiveTable data={topRatedTvShows} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
