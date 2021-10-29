import React from "react";
import { Container, Card, Badge } from "react-bootstrap";
import { DetailedData } from "../../pages/Details";
import "./MediaDetails.css";

interface Props {
  data: DetailedData;
}

// TODO: AQUI AQUI AQUI
const MediaDetail: React.FC<Props> = ({ data }) => {
  const len_types = data.types.length - 1;
  return (
    <Container style={{ height: "100vh", overflow: "hidden" }}>
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <h1 className="title-big-font">{data.title}</h1>
          </div>
          <div>
            <h1 className="title-big-font">
              {data.rating}
              <span className="not-white">/10</span>
            </h1>
          </div>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <div>
            {data.types.map((type, index) => {
              return (
                <span key={index}>
                  <span className="not-white">{type}</span>
                  {len_types !== index ? (
                    <span className="mx-1 not-white">-</span>
                  ) : null}
                </span>
              );
            })}
            <span className="mx-4">
              {data.genres.map((genre, key) => {
                return (
                  <Badge pill bg="dark" key={key} className="not-white mx-1">
                    {genre}
                  </Badge>
                );
              })}
            </span>
          </div>
          <div>
            <span className="not-white">
              <strong>{data.popularity}th</strong> place on popularity
            </span>
          </div>
        </div>
      </div>
      <Card style={{ backgroundColor: "#222" }}>
        <div className="d-flex m-3">
          <div>
            <img
              src={data.poster}
              alt={data.title}
              className="poster-img mx-2"
            />
          </div>
          <div className="mx-5">
            <h3>Synopsis</h3>
            <p className="not-white">{data.sinapse}</p>
            <h3 className="mt-2">Actors</h3>
            <div className="d-flex justify-content-between mt-3">
              {data.top_cast.map((actor, key) => {
                return (
                  <Card
                    key={key}
                    style={{ backgroundColor: "#111", width: "10rem" }}
                    className="py-2"
                  >
                    <Card.Img
                      variant="top"
                      src={actor.avatar}
                      className="avatar-img"
                    />
                    <Card.Body>
                      {/* <div className="d-flex justify-content-center"> */}
                      <Card.Title>{actor.name}</Card.Title>
                      {/* </div> */}
                      <Card.Subtitle className="not-white">
                        as {actor.character}
                      </Card.Subtitle>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default MediaDetail;
