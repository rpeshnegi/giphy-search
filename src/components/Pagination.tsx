import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { TRootState } from "../store";
import { getUpdatedSearchParams } from "../utils/helper";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pagination } = useSelector((state: TRootState) => state.giphy);

  const next = () => {
    setSearchParams(
      getUpdatedSearchParams({
        searchParams,
        pagination: {
          offset: (pagination?.offset || 0) + 1,
          count:
            (searchParams.get("limit") as unknown as number) ||
            pagination.count,
          total_count: pagination.total_count,
        },
      })
    );
  };

  const prev = () => {
    setSearchParams(
      getUpdatedSearchParams({
        searchParams,
        pagination: {
          offset: (pagination?.offset || 0) - 1,
          count:
            (searchParams.get("limit") as unknown as number) ||
            pagination.count,
          total_count: pagination.total_count,
        },
      })
    );
  };

  const handleLimitChange = (limit: number) => {
    setSearchParams(
      getUpdatedSearchParams({
        searchParams,
        pagination: {
          count: limit,
          offset: 0,
          total_count: 0,
        },
      })
    );
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white p-3 my-4">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <select
            onChange={(e) =>
              handleLimitChange(e.target.value as unknown as number)
            }
            id="count"
            value={searchParams.get("limit") || pagination.count}
            name="count"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          {pagination?.total_count > 0 ? (
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {pagination.offset * pagination.count + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {pagination?.count + pagination.offset * pagination.count}
              </span>{" "}
              of <span className="font-medium">{pagination?.total_count}</span>{" "}
              results
            </p>
          ) : (
            <p className="text-sm text-gray-700">No records</p>
          )}
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={pagination.total_count === 0 || pagination.offset === 0}
              onClick={prev}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <button
              disabled={
                pagination.total_count === 0 ||
                Math.floor(pagination.total_count / pagination.count) ===
                  pagination.offset
              }
              onClick={next}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
