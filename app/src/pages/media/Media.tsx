import React, { useState, useEffect } from "react";
import "./Media.css";

interface IShares {
  page: number;
  total: number;
  items: IShare[];
}

interface IShare {
  name: string;
  path: string;
  isDir: boolean;
}

export default () => {
  const [category, setCategory] = useState({
    path: "/talks/Exhortations",
  });
  const [categories, setCategories] = useState({
    page: 1,
    total: 0,
    items: [],
  } as IShares);
  const [data, setData] = useState({
    response: { page: 1, total: 0, items: [] } as IShares,
    error: null as string | null,
  });
  useEffect(() => {
    fetch(`https://localhost:10443/filestation/files?path=/talks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as IShares;
        setCategories(data);
      })
      .catch(() => {
        setCategories({ page: 1, total: 0, items: [] } as IShares);
      });
  }, []);
  useEffect(() => {
    fetch(`https://localhost:10443/filestation/files?path=${category.path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as IShares;
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
      <div className="files">
        <h2>Recordings</h2>
        <ul>
          {data.response.items.map((share) => {
            return (
              <li key={share.name}>
                <div>
                  <span>
                    <a
                      href={
                        "https://localhost:10443/filestation/files/download?path=" +
                        share.path
                      }
                    >
                      {share.name}
                    </a>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
