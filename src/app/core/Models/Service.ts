
export interface Service {
  id?: number
  name: string,
  description: string,
  status: ServiceStatus
}

export enum ServiceStatus {
    Active,
    Inactive,
    PendingApproval
}

