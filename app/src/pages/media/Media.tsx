import React, { useState, useEffect } from "react";
import "./Media.css";
import {
  FileStationRoutes,
  IFiles,
  IFile,
  AdminItemsRoutes,
} from "../../services";
import dateFormat from "dateformat";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import {
  useAppContext,
  IAppState,
  IAjaxFactory,
} from "components/contexts/app-context";
import DatePicker from "react-datepicker";

const defaultShare = "/talks";
const defaultPath = "/talks/Exhortations";

interface IData {
  response: IFiles;
  error?: string;
  editingIndex?: number;
  editingItem?: IFile;
  delete?: boolean;
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

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <h1>Media</h1>
        </Col>
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
                    ? ItemForm(index, item, data, setData, ajax)
                    : ItemView(index, item, state, data, setData)}
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

const ItemView = (
  index: number,
  item: IFile,
  state: IAppState,
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>
) => {
  const handleEdit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setData((s) => {
      return {
        ...s,
        editingIndex: index,
        editingItem: { ...item },
      };
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <a href={FileStationRoutes.download(item.path)}>{item.name}</a>
          {item.author ? ` - ${item.author}` : null}
          {item.publishedOn
            ? ` - ${dateFormat(item.publishedOn, "dddd mmmm dd yyyy")}`
            : null}
        </Col>
        {state.identity.isAuthenticated && data.editingIndex === undefined ? (
          <Col sm={1}>
            <Button variant="light" onClick={handleEdit}>
              Edit
            </Button>
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col>{item.description}</Col>
      </Row>
    </Container>
  );
};

const ItemForm = (
  index: number,
  item: IFile,
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  ajax: IAjaxFactory
) => {
  const setField = <P extends keyof IFile>(name: P, value: string) => {
    setData((s) => {
      return {
        ...s,
        response: {
          ...s.response,
          items: [
            ...s.response.items.slice(0, index),
            {
              ...s.response.items[index],
              [name]: value,
            },
            ...s.response.items.slice(index + 1),
          ],
        } as IFiles,
      } as IData;
    });
  };

  const handleCancel = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setData((s) => {
      return {
        ...s,
        response: {
          ...s.response,
          items: [
            ...s.response.items.slice(0, index),
            s.editingItem as IFile,
            ...s.response.items.slice(index + 1),
          ],
        },
        editingIndex: undefined,
        editingItem: undefined,
      };
    });
  };

  const handleDeleteShow = () => {
    setData((s) => {
      return {
        ...s,
        delete: true,
      };
    });
  };

  const handleDeleteHide = () => {
    setData((s) => {
      return {
        ...s,
        delete: false,
      };
    });
  };

  const handleDelete = () => {
    ajax
      .remove(
        item.id
          ? AdminItemsRoutes.remove(item.id)
          : FileStationRoutes.remove(item.path),
        item
      )
      .then(async (response) => {
        if (response.ok) {
          setData((s) => {
            return {
              ...s,
              response: {
                ...s.response,
                items: [
                  ...s.response.items.slice(0, index),
                  ...s.response.items.slice(index + 1),
                ],
              },
              editingIndex: undefined,
              editingItem: undefined,
              delete: false,
            };
          });
        } else {
          console.log("Request failed");
        }
      });
  };

  const validateForm = (): boolean => {
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (validateForm()) {
      if (item.id) {
        ajax
          .put(AdminItemsRoutes.update(item.id as number), item)
          .then(async (response) => {
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
                  editingIndex: undefined,
                  editingItem: undefined,
                };
              });
            } else {
              console.log("Request failed");
            }
          });
      } else {
        ajax.post(AdminItemsRoutes.add(), item).then(async (response) => {
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
                editingIndex: undefined,
                editingItem: undefined,
              };
            });
          } else {
            console.log("Request failed");
          }
        });
      }
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Modal show={data.delete} onHide={handleDeleteHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
          <p>
            "<em>{item.name}</em>"
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => {
                  setField("name", e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={item.author ?? ""}
                onChange={(e) => {
                  setField("author", e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Published On</Form.Label>
              <DatePicker
                name="publishedOn"
                wrapperClassName="form-datepicker"
                className="form-control date-picker"
                selected={
                  item.publishedOn ? new Date(item.publishedOn) : undefined
                }
                dateFormat="Pp"
                showTimeSelect
                onChange={(value: any) => {
                  setField("publishedOn", value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={item.description ?? ""}
                onChange={(e) => {
                  setField("description", e.target.value);
                }}
              />
            </Form.Group>
            <ButtonGroup>
              <Button variant="danger" onClick={handleDeleteShow}>
                Delete
              </Button>
            </ButtonGroup>
            <ButtonGroup className="float-right">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
