import { Injectable } from '@angular/core';

import { Server } from './servers.model';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  private servers: Server[] = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online',
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline',
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline',
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    return this.servers.find(s => s.id === id);
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find(s => s.id === id);

    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
