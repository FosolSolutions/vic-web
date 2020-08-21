import React, { useState, useEffect, useContext } from "react";
import "./Media.css";
import { API, IFiles } from "../../services";
import dateFormat from "dateformat";
import { Row, Col, Button } from "react-bootstrap";
import { AuthenticationContext } from "../../components/authentication/AuthenticationContext";
import { useHistory } from "react-router-dom";

const defaultShare = "/talks";
const defaultPath = "/talks/Exhortations";

export default () => {
  const history = useHistory();
  const identity = useContext(AuthenticationContext);
  const [category, setCategory] = useState({
    path: defaultPath,
  });
  const [categories, setCategories] = useState({
    page: 1,
    total: 0,
    items: [],
  } as IFiles);
  const [data, setData] = useState({
    response: { page: 1, total: 0, items: [] } as IFiles,
    error: null as string | null,
  });
  useEffect(() => {
    fetch(API.FileStation.Files(defaultShare), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setCategories(data);
      })
      .catch(() => {
        setCategories({ page: 1, total: 0, items: [] } as IFiles);
      });
  }, []);
  useEffect(() => {
    fetch(API.FileStation.Files(category.path), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setData({
          response: data,
          error: null,
        });
      })
      .catch((error) => {
        setData({
          response: { page: 1, total: 0, items: [] },
          error: error,
        });
      });
  }, [category.path]);
  return (
    <React.Fragment>
      <Row>
        <Col sm={11}>
          <h1>Media</h1>
        </Col>
        <Col sm={1}>
          {identity.user.isAuthenticated ? (
            <Button onClick={() => history.push("/admin/media")}>Edit</Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <h3>Categories</h3>
          <ul>
            {categories.items.map((category) => {
              return (
                <li key={category.name}>
                  <a
                    href={"#" + category.name}
                    onClick={() => setCategory({ path: category.path })}
                  >
                    {category.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col sm={10}>
          <ul>
            {data.response.items.map((share) => {
              return (
                <li key={share.name}>
                  <div>
                    <a href={API.FileStation.Download(share.path)}>
                      {share.name}
                    </a>
                    {share.author ? ` - ${share.author}` : ""}
                    {share.publishedOn
                      ? ` - ${dateFormat(
                          share.publishedOn,
                          "dddd mmmm dd yyyy"
                        )}`
                      : ""}
                  </div>
                  <div>{share.description}</div>
                  <hr />
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
    </React.Fragment>
  );
};
