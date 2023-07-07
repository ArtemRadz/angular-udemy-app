export enum ResourceType {
  Blueprint = 'blueprint',
  Server = 'server',
}

export interface Resource {
  type: ResourceType;
  name: string;
  content: string;
}
