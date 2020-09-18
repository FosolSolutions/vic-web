import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPagesRoutes, IPage } from "services";
import { Oauth } from "../../services/ajax";

export interface IPagesState {
  id: number;
  path?: string;
  index?: number;
  pages: IPage[];
  __html: string;
}

const initialState = {
  id: 0,
  pages: [],
  __html: "",
} as IPagesState;

/**
 * Make AJAX request to fetch the page for the specified 'id'.
 */
export const getPageById = createAsyncThunk(
  "pages/getPageById",
  async (id: number): Promise<IPage> => {
    const response = await Oauth.get(AdminPagesRoutes.get(id));
    const data = (await response.json()) as IPage;
    return Promise.resolve(data);
  }
);

/**
 * Make AJAX request to fetch the page for the specified 'path'.
 */
export const getPageByPath = createAsyncThunk(
  "pages/getPageByPath",
  async (path: string): Promise<IPage> => {
    const response = await Oauth.get(AdminPagesRoutes.getForPath(path));
    const data = (await response.json()) as IPage;
    return Promise.resolve(data);
  }
);

export const pages = createSlice({
  name: "pages",
  initialState: initialState,
  reducers: {
    /** If the page has been loaded make it the current page. */
    setPageById: (state, action: PayloadAction<number>) => {
      const i = state.pages.findIndex((p) => p.id === action.payload);
      if (i >= 0) {
        state.id = state.pages[i].id;
        state.path = state.pages[i].path;
        state.__html = state.pages[i].body;
        state.index = i;
      } else {
        state.id = 0;
        state.__html = "";
        state.path = undefined;
        state.index = undefined;
      }
    },
    /** If the page has been loaded make it the current page. */
    setPageByPath: (state, action: PayloadAction<string>) => {
      const i = state.pages.findIndex((p) => p.path === action.payload);
      if (i >= 0) {
        state.id = state.pages[i].id;
        state.path = state.pages[i].path;
        state.__html = state.pages[i].body;
        state.index = i;
      } else {
        state.id = 0;
        state.__html = "";
        state.path = undefined;
        state.index = undefined;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPageById.pending, (state) => ({ ...state }))
      .addCase(getPageById.fulfilled, (state, action) => {
        const i = state.pages.findIndex((p) => p.id === action.payload.id);
        if (i >= 0) {
          return {
            ...state,
            id: action.payload.id,
            path: action.payload.path,
            __html: action.payload.body,
            index: i,
          };
        }
        return {
          ...state,
          id: action.payload.id,
          path: action.payload.path,
          __html: action.payload.body,
          index: state.pages.length,
          pages: [...state.pages, action.payload],
        };
      })
      .addCase(getPageByPath.pending, (state) => ({ ...state }))
      .addCase(getPageByPath.fulfilled, (state, action) => {
        const i = state.pages.findIndex((p) => p.path === action.payload.path);
        if (i >= 0) {
          return {
            ...state,
            id: action.payload.id,
            path: action.payload.path,
            __html: action.payload.body,
            index: i,
          };
        }
        return {
          ...state,
          id: action.payload.id,
          path: action.meta.arg,
          __html: action.payload.body,
          index: state.pages.length,
          pages: [...state.pages, action.payload],
        };
      }),
});
