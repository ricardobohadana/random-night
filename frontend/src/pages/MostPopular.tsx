import React from "react";
import BestTable from "../components/BestTable/BestTable";
import { mostPopularMovies } from "../api/MostPopularMovies";
import { mostPopularTvShows } from "../api/MostPopularTvShows";

import { Container, Row, Col } from "react-bootstrap";

const MostPopular = () => {
  return (
    <Container>
      <Row className="pt-5">
        <Col>
          <BestTable isMovie isPopular data={mostPopularMovies} />
        </Col>
        <Col>
          <BestTable isPopular data={mostPopularTvShows} />
        </Col>
      </Row>
    </Container>
  );
};

export default MostPopular;
