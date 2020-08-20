import React, { useState, useEffect } from "react";
import { API, IFiles, IFile } from "../../../services";
import DatePicker from "react-datepicker";

const defaultShare = "/talks";
const defaultPath = "/talks/Exhortations";

export default () => {
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

  const setArrayField = <P extends keyof IFile>(
    index: number,
    name: P,
    value: string
  ) => {
    let state = {
      ...data,
      response: {
        ...data.response,
        items: [
          ...data.response.items.slice(0, index),
          {
            ...data.response.items[index],
            [name]: value,
          },
          ...data.response.items.slice(index + 1),
        ],
      },
    };
    setData(state);
  };
  return (
    <div>
      <h1>Media Administration</h1>
      <div>
        <div className="categories">
          <h1>Categories</h1>
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
        </div>
      </div>
      <div className="files">
        <h2>Recordings</h2>
        <ul>
          {data.response.items.map((item, i) => {
            return (
              <li key={item.path}>
                <form>
                  <div>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => {
                          setArrayField(i, "name", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label>Author</label>
                      <input
                        type="text"
                        name="author"
                        value={item.author ?? ""}
                        onChange={(e) => {
                          setArrayField(i, "author", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label>Published On</label>
                      <DatePicker
                        name="publishedOn"
                        selected={item.publishedOn ?? new Date()}
                        dateFormat="Pp"
                        onChange={(value: any) => {
                          setArrayField(i, "publishedOn", value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={item.description ?? ""}
                      onChange={(e) => {
                        setArrayField(i, "description", e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Save" />
                  </div>
                </form>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
