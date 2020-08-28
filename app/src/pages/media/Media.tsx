import React, { useState, useEffect } from "react";
import "./Media.css";
import { FileStationRoutes, IFiles, IFile } from "../../services";
import { Row, Col, Button } from "react-bootstrap";
import { useAppContext } from "components/contexts/app-context";
import { ItemView, ItemForm, UploadModal } from "./";

const defaultShare = "/talks";
const defaultPath = "/talks/Exhortations";

export interface IData {
  response: IFiles;
  error?: string;
  editingIndex?: number;
  editingItem?: IFile;
  delete?: boolean;
  upload?: boolean;
}

export default () => {
  const [state, , ajax] = useAppContext();
  const [category, setCategory] = useState({
    path: defaultPath,
  });
  const [categories, setCategories] = useState({
    page: 1,
    total: 0,
    items: [],
  } as IFiles);
  const [data, setData] = useState({
    response: { page: 1, total: 0, items: [] },
  } as IData);
  useEffect(() => {
    ajax
      .get(FileStationRoutes.files(defaultShare))
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setCategories(data);
      })
      .catch(() => {
        setCategories({ page: 1, total: 0, items: [] } as IFiles);
      });
  }, []);
  useEffect(() => {
    ajax
      .get(FileStationRoutes.files(category.path))
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
        {state.identity.isAuthenticated ? (
          <UploadModal
            path={category.path}
            data={data}
            setData={setData}
            ajax={ajax}
          ></UploadModal>
        ) : null}
        <Col>
          <h1>Media</h1>
        </Col>
        {state.identity.isAuthenticated ? (
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
            {!data.response.items || data.response.items?.length === 0 ? (
              <li>
                <span>No media found.</span>
              </li>
            ) : null}
            {data.response?.items?.map((item, index) => {
              return (
                <li key={index}>
                  {data.editingIndex === index
                    ? ItemForm({ index, item, data, setData, ajax })
                    : ItemView({ index, item, state, data, setData })}
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
