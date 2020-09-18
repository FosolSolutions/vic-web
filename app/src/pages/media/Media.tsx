import React, { useState, useEffect } from "react";
import "./Media.css";
import { FileStationRoutes, IFiles, IFile } from "../../services";
import { Row, Col, Button } from "react-bootstrap";
import { Oauth } from "../../services/ajax";
import { ItemView, ItemForm, UploadModal } from "./";
import IdentityContext from "../../contexts/identity";

const defaultShare = "/talks";
const defaultCategory = {
  name: "Exhortations",
  path: "/talks/Exhortations",
};

export interface IData {
  response: IFiles;
  error?: string;
  editingIndex?: number;
  editingItem?: IFile;
  delete?: boolean;
  upload?: boolean;
}

export default () => {
  const [identity] = React.useContext(IdentityContext);
  const [category, setCategory] = useState(defaultCategory);
  const [categories, setCategories] = useState({
    page: 1,
    total: 0,
    items: [],
  } as IFiles);
  const [data, setData] = useState({
    response: { page: 1, total: 0, items: [] },
  } as IData);

  useEffect(() => {
    Oauth.get(FileStationRoutes.files(defaultShare))
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setCategories(data);
      })
      .catch(() => {
        setCategories({ page: 1, total: 0, items: [] } as IFiles);
      });
  }, []);

  useEffect(() => {
    Oauth.get(FileStationRoutes.files(category.path))
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setData({
          response: data,
        });
      })
      .catch((error) => {
        setData({
          response: { page: 1, total: 0, items: [] },
          error: error,
        });
      });
  }, [category.path]);

  const handleUploadShow = () => {
    setData((s) => {
      return {
        ...s,
        upload: true,
      };
    });
  };

  return (
    <React.Fragment>
      <Row>
        {identity.isAuthenticated ? (
          <UploadModal
            path={category.path}
            data={data}
            setData={setData}
          ></UploadModal>
        ) : null}
        <Col>
          <h1>Media</h1>
        </Col>
        {identity.isAuthenticated ? (
          <Col>
            <Button
              variant="secondary"
              onClick={handleUploadShow}
              className="float-right"
            >
              Upload
            </Button>
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col sm={2}>
          <h3>Categories</h3>
          <ul>
            {categories.items?.map((category) => {
              return (
                <li key={category.path}>
                  <a
                    href={"#" + category.name}
                    onClick={() =>
                      setCategory({ name: category.name, path: category.path })
                    }
                  >
                    {category.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col sm={10}>
          <h3>{category.name}</h3>
          <ul>
            {!data.response.items || data.response.items?.length === 0 ? (
              <li>
                <span>No media found.</span>
              </li>
            ) : null}
            {data.response?.items?.map((item, index) => {
              return (
                <li key={index}>
                  {data.editingIndex === index
                    ? ItemForm({ index, item, data, setData })
                    : ItemView({ index, item, data, setData })}
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
