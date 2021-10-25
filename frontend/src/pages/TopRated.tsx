import React from "react";
import BestTable from "../components/BestTable/BestTable";
import { topRatedMovies } from "../api/TopRatedMovies";
import { topRatedTvShows } from "../api/TopRatedTvShows";
import { Container, Row, Col } from "react-bootstrap";

const TopRated: React.FC = () => {
  return (
    <Container>
      <Row className="pt-5">
        <Col>
          <BestTable isMovie data={topRatedMovies} />
        </Col>
        <Col>
          <BestTable data={topRatedTvShows} />
        </Col>
      </Row>
    </Container>
  );
};

export default TopRated;
