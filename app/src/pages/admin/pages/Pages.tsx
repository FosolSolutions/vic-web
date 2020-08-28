import React from "react";
import {
  Row,
  Col,
  Form,
  Container,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { useAppContext } from "components/contexts/app-context";
import { AdminPagesRoutes, IList, IPage } from "services";

interface IData {
  index?: number;
  page: IPage | null;
  pages: IList<IPage>;
}

export default () => {
  const [, , ajax] = useAppContext();
  const [data, setData] = React.useState<IData>({
    page: null,
    pages: {
      page: 1,
      total: 0,
      items: [],
    },
  });
  React.useEffect(() => {
    ajax.get(AdminPagesRoutes.list()).then(async (response) => {
      const data = (await response.json()) as IList<IPage>;
      setData((s) => {
        return {
          ...s,
          pages: {
            page: data.page,
            total: data.total,
            items: data.items,
          },
          page: data.items[0],
          index: 0,
        };
      });
    });
  }, [data.pages.page]);

  const handleItemClick = (index: number) => {
    setData((s) => {
      return {
        ...s,
        page: s.pages.items[index],
        index: index,
      };
    });
  };

  const setField = <P extends keyof IPage>(name: P, value: string) => {
    setData((s) => {
      return {
        ...s,
        page: {
          ...s.page,
          [name]: value,
        } as IPage,
      };
    });
  };
  const handleCancel = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setData((s) => {
      return {
        ...s,
        page: s.pages.items[s.index ?? 0],
      };
    });
  };

  const validateForm = (page: IPage | null): boolean => {
    return !!page?.path && !!page?.name;
  };

  const updatePage = async (page: IPage) => {
    const response = await ajax.put(AdminPagesRoutes.update(page.id), page);
    if (response.ok) {
      const data = (await response.json()) as IPage;
      setData((s) => {
        return {
          ...s,
          page: data,
          pages: {
            ...s.pages,
            items: [
              ...s.pages.items.slice(0, s.index),
              data,
              ...s.pages.items.slice((s.index ?? 0) + 1),
            ],
          },
        };
      });
    } else {
      console.log("Request failed");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (validateForm(data.page)) {
      updatePage(data.page as IPage);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Admin Pages</h1>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <ul>
            {data.pages.items.map((page, index) => {
              return (
                <li key={page.id}>
                  <a
                    href={`#${page.id}`}
                    onClick={() => handleItemClick(index)}
                  >
                    {page.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={data.page?.name ?? ""}
                      onChange={(e) => setField("name", e.currentTarget.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Path</Form.Label>
                    <Form.Control
                      type="text"
                      name="path"
                      value={data.page?.path ?? ""}
                      onChange={(e) => setField("path", e.currentTarget.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="body"
                      rows={15}
                      value={data.page?.body ?? ""}
                      onChange={(e) => setField("body", e.currentTarget.value)}
                    ></Form.Control>
                  </Form.Group>
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
        </Col>
      </Row>
    </>
  );
};
