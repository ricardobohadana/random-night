import React, { useState } from "react";
import { Container, Stack, Button, Form } from "react-bootstrap";
import RandomNightModal from "../components/RandomNight/RandomNightModal";
import "../components/RandomNight/RandomNight.css";
interface Props {}

interface FormElements extends HTMLFormControlsCollection {
  mediaSelect: HTMLInputElement;
}

interface mediaSelect extends HTMLFormElement {
  readonly elements: FormElements;
}

const RandomNight: React.FC<Props> = (props: Props) => {
  const [showGeneratedMedia, setShowGeneratedMedia] = useState<boolean>(false);
  const [media, setMedia] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<mediaSelect>) => {
    e.preventDefault();
    setShowGeneratedMedia(!showGeneratedMedia);
    // setMedia(parseInt(e.currentTarget.elements.mediaSelect.value));
  };

  return (
    <Container className="random-night-container">
      <Stack className="p-5">
        <h5 className="d-flex justify-content-center pb-5">
          Click the button below to generate your wonderful night!
        </h5>
        <Form className="mb-5" onSubmit={handleSubmit}>
          <Form.Label>Choose something to watch:</Form.Label>
          <Form.Select
            aria-label=""
            id="mediaSelect"
            onChange={(e) => setMedia(parseInt(e.currentTarget.value))}
          >
            <option value={0}>Any</option>
            <option value={1}>Movie</option>
            <option value={2}>TV Show</option>
          </Form.Select>
          <Button
            variant="outline-info mt-3"
            type="submit"
            style={{ width: "100%" }}
          >
            {showGeneratedMedia ? "Hide Night" : "Generate Night"}
          </Button>
        </Form>
        {showGeneratedMedia ? (
          <RandomNightModal show={showGeneratedMedia} media={media} />
        ) : null}
      </Stack>
    </Container>
  );
};

export default RandomNight;
