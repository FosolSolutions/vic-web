import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector, getPageByPath, pages } from "../reduxStore";

/**
 * Find the page for the specified 'path'.
 * If it is not currently in memory, make an AJAX request to fetch it.
 * @param path The path of the page to load.
 */
export const usePage = (path: string) => {
  const pageState = useTypedSelector((s) => s.pages);
  const page =
    pageState.index !== undefined
      ? { ...pageState.pages[pageState.index], __html: pageState.__html }
      : { id: 0, __html: "" };

  const dispatch = useDispatch();

  React.useEffect(() => {
    const found = pageState.pages.find((p) => p.path === path);
    if (!found) {
      dispatch(getPageByPath(path));
    } else {
      dispatch(pages.actions.setPageByPath(path));
    }
  }, [dispatch, path, pageState.pages]);

  return page;
};
