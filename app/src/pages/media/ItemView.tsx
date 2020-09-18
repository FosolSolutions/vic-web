import React from "react";
import { IFile, FileStationRoutes } from "services";
import IdentityContext from "../../contexts/identity";
import { IData } from "./Media";
import { Container, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";

export default (props: {
  index: number;
  item: IFile;
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
}) => {
  const [identity] = React.useContext(IdentityContext);

  const handleEdit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    props.setData((s) => {
      return {
        ...s,
        editingIndex: props.index,
        editingItem: { ...props.item },
      };
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <a href={FileStationRoutes.download(props.item.path)}>
            {props.item.name}
          </a>
          {props.item.author ? ` - ${props.item.author}` : null}
          {props.item.publishedOn
            ? ` - ${dateFormat(props.item.publishedOn, "dddd mmmm dd yyyy")}`
            : null}
        </Col>
        {identity.isAuthenticated && props.data.editingIndex === undefined ? (
          <Col sm={1}>
            <Button variant="light" onClick={handleEdit}>
              Edit
            </Button>
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col>{props.item.description}</Col>
      </Row>
    </Container>
  );
};
