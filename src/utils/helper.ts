import { TPagination } from "../store/giphies/types";

export const getUpdatedSearchParams = ({
  searchParams,
  pagination,
  search,
}: {
  searchParams: URLSearchParams;
  pagination?: TPagination;
  search?: string;
}) => {
  console.log({ pagination });
  return {
    q: search || searchParams.get("q") || "",
    offset: (pagination?.offset || 0) as unknown as string,
    limit: (pagination?.count || 50) as unknown as string,
  };
};
