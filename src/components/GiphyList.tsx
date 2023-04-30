import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TGiphy } from "../types/types";
import Pagination from "./Pagination";
import { TRootState } from "../store";
// interface Props = {};

const GiphyList = () => {
  const { loading, data } = useSelector((state: TRootState) => state.giphy);
  const [records, setRecords] = useState<TGiphy[]>([]);
  console.log({ records });

  useMemo(() => {
    setRecords(data);
  }, [data]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-8  gap-4">
          {records.map((giphy) => (
            <div key={giphy.id}>
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={giphy.images.fixed_width_small.url}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default GiphyList;
