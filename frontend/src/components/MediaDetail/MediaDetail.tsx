import React from "react";
import { Container, Card } from "react-bootstrap";
import { DetailedData } from "../../pages/Details";
import "./MediaDetails.css";

interface Props {
  data: DetailedData;
}

// TODO: AQUI AQUI AQUI
const MediaDetail: React.FC<Props> = ({ data }) => {
  return (
    <Container style={{ height: "100vh", overflow: "hidden" }}>
      <div className="d-flex justify-content-center mt-5">
        <h1>{data.title}</h1>
      </div>
      <div className="d-flex m-3">
        <img src={data.poster} alt={data.title} className="poster-img p-2" />
        <div>
          <h3>Synopsis</h3>
          <p className="p-2">{data.sinapse}</p>
          <h3>Actors</h3>
          <div className="d-flex justify-content-between mt-2">
            {data.top_cast.map((actor) => {
              return (
                <Card style={{ backgroundColor: "#222" }}>
                  <Card.Img
                    variant="top"
                    src={actor.avatar}
                    className="avatar-img"
                  />
                  <Card.Body>
                    <Card.Title>{actor.name}</Card.Title>
                    <Card.Text>as {actor.character}</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MediaDetail;
