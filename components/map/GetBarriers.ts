import { BACKEND_PORT, BASE_URL } from "@/config/urls";
import axios, { AxiosResponse } from "axios";

export function getBarriers(
  barrierIds: string[]
): Promise<AxiosResponse<Barrier>> {
  return axios.post(`${BASE_URL}:${BACKEND_PORT}/api/barriers/get`, barrierIds);
}
