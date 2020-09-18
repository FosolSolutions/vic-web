import React from "react";
import { IFile, IFiles, AdminItemsRoutes, FileStationRoutes } from "services";
import { IData } from "./Media";
import { Oauth } from "../../services/ajax";
import {
  Form,
  Modal,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

export default (props: {
  index: number;
  item: IFile;
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
}) => {
  const setField = <P extends keyof IFile>(name: P, value: string) => {
    props.setData((s) => {
      return {
        ...s,
        response: {
          ...s.response,
          items: [
            ...s.response.items.slice(0, props.index),
            {
              ...s.response.items[props.index],
              [name]: value,
            },
            ...s.response.items.slice(props.index + 1),
          ],
        } as IFiles,
      } as IData;
    });
  };

  const handleCancel = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    props.setData((s) => {
      return {
        ...s,
        response: {
          ...s.response,
          items: [
            ...s.response.items.slice(0, props.index),
            s.editingItem as IFile,
            ...s.response.items.slice(props.index + 1),
          ],
        },
        editingIndex: undefined,
        editingItem: undefined,
      };
    });
  };

  const handleDeleteShow = () => {
    props.setData((s) => {
      return {
        ...s,
        delete: true,
      };
    });
  };

  const handleDeleteHide = () => {
    props.setData((s) => {
      return {
        ...s,
        delete: false,
      };
    });
  };

  const handleDelete = () => {
    Oauth.delete(
      props.item.id
        ? AdminItemsRoutes.remove(props.item.id)
        : FileStationRoutes.remove(props.item.path),
      props.item
    ).then(async (response) => {
      if (response.ok) {
        props.setData((s) => {
          return {
            ...s,
            response: {
              ...s.response,
              items: [
                ...s.response.items.slice(0, props.index),
                ...s.response.items.slice(props.index + 1),
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

  const validateForm = (item: IFile): boolean => {
    return !!item.path && !!item.name;
  };

  const updateItem = async (item: IFile) => {
    const response = await Oauth.put(
      AdminItemsRoutes.update(item.id as number),
      item
    );
    if (response.ok) {
      const data = (await response.json()) as IFile;
      props.setData((state) => {
        return {
          ...state,
          response: {
            ...state.response,
            items: [
              ...state.response.items.slice(0, props.index),
              data,
              ...state.response.items.slice(props.index + 1),
            ],
          },
          editingIndex: undefined,
          editingItem: undefined,
        };
      });
    } else {
      console.log("Request failed");
    }
  };

  const addItem = async (item: IFile) => {
    const response = await Oauth.post(AdminItemsRoutes.add(), item);
    if (response.ok) {
      const data = (await response.json()) as IFile;
      props.setData((state) => {
        return {
          ...state,
          response: {
            ...state.response,
            items: [
              ...state.response.items.slice(0, props.index),
              data,
              ...state.response.items.slice(props.index + 1),
            ],
          },
          editingIndex: undefined,
          editingItem: undefined,
        };
      });
    } else {
      console.log("Request failed");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (validateForm(props.item)) {
      if (props.item.id) {
        updateItem(props.item);
      } else {
        addItem(props.item);
      }
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Modal show={props.data.delete} onHide={handleDeleteHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
          <p>
            "<em>{props.item.name}</em>"
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
                value={props.item.name}
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
                value={props.item.author ?? ""}
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
                  props.item.publishedOn
                    ? new Date(props.item.publishedOn)
                    : undefined
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
                value={props.item.description ?? ""}
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
