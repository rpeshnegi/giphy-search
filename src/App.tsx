import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./index.css";
import GiphyList from "./components/GiphyList";
import { useSearchParams } from "react-router-dom";
import { TPagination } from "./store/giphies/types";
import { dispatch } from "./store";
import { getGiphies } from "./store/giphies/reducer";
import { getUpdatedSearchParams } from "./utils/helper";

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = debounce((data: TPagination & { q: string }) => {
    console.log({ data });
    dispatch(getGiphies(data));
  }, 300);

  useEffect(() => {
    setSearchParams(
      getUpdatedSearchParams({
        searchParams,
        search,
        pagination: {
          offset: (searchParams.get("offset") || 0) as unknown as number,
          count: (searchParams.get("limit") || 50) as unknown as number,
          total_count: (searchParams.get("total_count") ||
            0) as unknown as number,
        },
      })
    );
  }, [search, searchParams]);

  useEffect(() => {
    console.log({ searchParams });
    getData({
      q: searchParams.get("q") || "",
      offset: searchParams.get("offset") as unknown as number,
      count: searchParams.get("limit") as unknown as number,
      total_count: 0,
    });
    return () => {
      getData.cancel();
    };
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:mx-24">
      <div className="sm:mx-auto sm:w-full max-w-2xl">
        <div className="flex justify-center items-center py-6">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={searchParams.get("q") || search}
            onChange={(e) => setSearch(e.target.value)}
            className="block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <GiphyList />
        </div>
      </div>
    </div>
  );
}

export default App;
