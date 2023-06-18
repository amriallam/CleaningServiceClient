import { ServiceStatus } from "./ServiceStatus";

export interface Service {
  id?: number
  name: string,
  description: string,
  status: ServiceStatus,
}

