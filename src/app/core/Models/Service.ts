
export interface Service {
  id?: number
  name: string,
  description: string,
  status: ServiceStatus,
  imageUrls: string[]
}

export enum ServiceStatus {
    Active,
    Inactive,
    PendingApproval
}

