import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MediaDetail from "../components/MediaDetail/MediaDetail";
import { domain_url } from "../api/url";

// interface Props {}

type DetailsParams = {
  slug: string;
};

export interface DetailedData {
  title: string;
  poster: string;
  sinapse: string;
  rating: string;
  popularity: string;
  genres: string[];
  types: string[];
  top_cast: {
    avatar: string;
    name: string;
    character: string;
  }[];
}

const Details: React.FC = () => {
  const { slug } = useParams<DetailsParams>();

  const [mediaData, setMediaData] = useState<DetailedData>({
    title: "",
    poster: "",
    sinapse: "",
    popularity: "",
    rating: "",
    genres: [],
    types: [],
    top_cast: [
      {
        avatar: "",
        name: "",
        character: "",
      },
    ],
  });

  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    const url = `${domain_url}${slug}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setMediaData(data);
        setHasData(true);
      });
  }, [slug]);

  const loadingSpinner = (
    <div
      className="d-flex justify-content-center mt-5"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const mediaDataHTML = hasData ? (
    <div>
      <MediaDetail data={mediaData} />
    </div>
  ) : null;

  return (
    <Container>
      <Row>
        <Col>{!hasData ? loadingSpinner : mediaDataHTML}</Col>
      </Row>
    </Container>
  );
};

export default Details;
