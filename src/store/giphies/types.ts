import { TGiphy } from "../../types/types";

export type GiphiesState = {
  loading: boolean;
  data: TGiphy[];
  meta: null | {
    msg: string;
    response_id: string;
    status: number;
  };
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  error: any;
};

export type TGiphyActions = {
  type: string;
  payload: TGiphy[] | [];
};

export type TPagination = {
  count: number;
  offset: number;
  total_count: number;
};
export type TGiphiesRes = {
  meta: {
    msg: string;
    response_id: string;
    status: number;
  };
  data: TGiphy[];
  pagination: TPagination;
};

export type IResponse = {
  config: any;
  data: TGiphiesRes;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};
