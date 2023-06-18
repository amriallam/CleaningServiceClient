import { Resource } from "./Resource";

export class Room {
  constructor(
    public RoomId: number,
    public Resource: Resource,
    public Size: number,
    public Capacity: number,
    public Bed: Resource,
    public Services: string[],
    public Description: string,
    public Rating: number,
    public ImageURL: String
  ) { }
}
