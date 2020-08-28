import React, { useState } from "react";
import { IData } from "./Media";
import Modal from "react-bootstrap/esm/Modal";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IFile, AdminItemsRoutes } from "services";
import { IAjaxFactory } from "components/contexts/app-context";

export interface IUpload {
  file: File;
  item: IFile;
}

const defaultUploadData = (path: string) => {
  return {
    file: new File([], "test"),
    item: {
      name: "",
      path: path,
      author: "",
      description: "",
      publishedOn: null,
      isDir: false,
    },
  } as IUpload;
};

export default (props: {
  path: string;
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
  ajax: IAjaxFactory;
}) => {
  const [upload, setUpload] = useState<IUpload>(defaultUploadData(props.path));

  const setField = <P extends keyof IFile>(name: P, value: string) => {
    setUpload((s) => {
      return {
        ...s,
        item: {
          ...s.item,
          [name]: value,
        },
      };
    });
  };

  const handleUploadHide = () => {
    props.setData((s) => {
      return {
        ...s,
        upload: false,
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files.length > 0) {
      setUpload((s) => {
        return {
          ...s,
          file: files[0],
        };
      });
    }
  };

  const validateForm = (): boolean => {
    return !!upload.file && !!upload.item.name;
  };

  const handleUpload = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    if (validateForm()) {
      const form = new FormData();
      form.append("file", (upload.file as unknown) as File);
      form.append("item", JSON.stringify(upload.item));
      props.ajax
        .post(AdminItemsRoutes.upload(), form)
        .then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as IFile;
            props.setData((state) => {
              return {
                ...state,
                response: {
                  ...state.response,
                  items: [data, ...state.response.items],
                },
                editingIndex: undefined,
                editingItem: undefined,
                upload: false,
              };
            });
            setUpload(defaultUploadData(props.path));
          } else {
            console.log("Request failed");
          }
        });
    }
  };

  return (
    <Modal show={props.data.upload} onHide={handleUploadHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Media</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.File onChange={handleFileChange}></Form.File>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="name"
                    value={upload.item.name}
                    onChange={(e) => setField("name", e.currentTarget.value)}
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
                    placeholder="author"
                    value={upload.item.author}
                    onChange={(e) => setField("author", e.currentTarget.value)}
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
                    dateFormat="Pp"
                    selected={upload.item.publishedOn}
                    onChange={(value: any) => setField("publishedOn", value)}
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
                    value={upload.item.description}
                    onChange={(e) =>
                      setField("description", e.currentTarget.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleUploadHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
