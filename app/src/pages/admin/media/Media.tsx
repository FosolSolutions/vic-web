import React, { useState, useEffect } from "react";
import {
  getFileStation,
  getAdminItems,
  IFiles,
  IFile,
} from "../../../services";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Media.css";
import { AuthenticationContext } from "../../../components/contexts/AuthenticationContext";
import { SiteContext } from "../../../components/contexts/SiteContext";

const defaultShare = "/talks";
const defaultPath = "/talks/Exhortations";

export default () => {
  const [identity] = React.useContext(AuthenticationContext);
  const [, setSite] = React.useContext(SiteContext);
  const FileStation = getFileStation(identity, setSite);
  const AdminItems = getAdminItems(identity, setSite);
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
    FileStation.files(defaultShare)
      .then(async (response) => {
        const data = (await response.json()) as IFiles;
        setCategories(data);
      })
      .catch(() => {
        setCategories({ page: 1, total: 0, items: [] } as IFiles);
      });
  }, []);
  useEffect(() => {
    FileStation.files(category.path)
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

  const setArrayField = <P extends keyof IFile>(
    index: number,
    name: P,
    value: string
  ) => {
    setData((state) => {
      return {
        ...state,
        response: {
          ...state.response,
          items: [
            ...state.response.items.slice(0, index),
            {
              ...state.response.items[index],
              [name]: value,
            },
            ...state.response.items.slice(index + 1),
          ],
        },
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    var item = data.response.items[index];

    if (validateForm()) {
      if (item.id) {
        AdminItems.update(item.id as number, item).then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as IFile;
            setData((state) => {
              return {
                ...state,
                response: {
                  ...state.response,
                  items: [
                    ...state.response.items.slice(0, index),
                    data,
                    ...state.response.items.slice(index + 1),
                  ],
                },
              };
            });
          } else {
            console.log("Request failed");
          }
        });
      } else {
        AdminItems.add(item).then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as IFile;
            setData((state) => {
              return {
                ...state,
                response: {
                  ...state.response,
                  items: [
                    ...state.response.items.slice(0, index),
                    data,
                    ...state.response.items.slice(index + 1),
                  ],
                },
              };
            });
          } else {
            console.log("Request failed");
          }
        });
      }
    }
  };

  const validateForm = (): boolean => {
    return true;
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <h1>Media Administration</h1>
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
        <Col sm={10} className="files">
          <ul>
            {data.response.items.map((item, i) => {
              return (
                <li key={item.path}>
                  <Form onSubmit={(e) => handleSubmit(e, i)}>
                    <div>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={item.name}
                          onChange={(e) => {
                            setArrayField(i, "name", e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                          type="text"
                          name="author"
                          value={item.author ?? ""}
                          onChange={(e) => {
                            setArrayField(i, "author", e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Published On</Form.Label>
                        <DatePicker
                          name="publishedOn"
                          className="form-control date-picker"
                          selected={
                            item.publishedOn
                              ? new Date(item.publishedOn)
                              : undefined
                          }
                          dateFormat="Pp"
                          showTimeSelect
                          onChange={(value: any) => {
                            setArrayField(i, "publishedOn", value);
                          }}
                        />
                      </Form.Group>
                    </div>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={item.description ?? ""}
                        onChange={(e) => {
                          setArrayField(i, "description", e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit" className="btn btn-primary">
                        Save
                      </Button>
                    </Form.Group>
                  </Form>
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
