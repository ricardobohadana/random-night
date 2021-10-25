import React from "react";
import { Table } from "react-bootstrap";
import { TV } from "../../api/FoodAndBeverages";
import { Link } from "react-router-dom";

const TopFiveTable: React.FC<{
  isPopular?: boolean;
  isMovie?: boolean;
  data: TV[];
}> = ({ isPopular, isMovie, data }) => {
  const titleText = isMovie ? "Movies" : "TV Shows";
  const preTitleText = isPopular ? "Most Popular" : "Top Rated";
  const borderRadius = 12;

  return (
    <Table responsive="md" striped hover variant="dark" width={700}>
      <thead style={{ borderRadius: borderRadius }}>
        <tr style={{ borderRadius: borderRadius }}>
          <th style={{ borderRadius: borderRadius, width: 75 }}></th>
          <th style={{ borderRadius: borderRadius }}>
            {preTitleText} {titleText}
          </th>
          <th style={{ borderRadius: borderRadius, width: 100 }}>
            <span className="d-flex justify-content-center">Nota</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 5).map((val: TV, key: number) => {
          let next_location = `/details/${val.Id}`;
          return (
            <tr
              key={key}
              style={{ borderRadius: borderRadius }}
              onClick={(e) => {
                window.location.pathname = next_location;
              }}
            >
              <td
                style={{ borderRadius: borderRadius }}
                className="d-flex justify-content-center"
              >
                <Link to={next_location}>
                  <img
                    alt={val.Title}
                    src={val.Poster}
                    className="table-poster"
                  />
                </Link>
              </td>
              <td
                style={{ borderRadius: borderRadius }}
                className="align-middle"
              >
                <Link to={`/details/${val.Id}`}>
                  {key + 1}º - {val.Title}
                </Link>
              </td>
              <td
                style={{ borderRadius: borderRadius }}
                className="align-middle"
              >
                <p className="d-flex justify-content-center">
                  {val.Rating === "None" ? "Sem Nota" : val.Rating}
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TopFiveTable;
