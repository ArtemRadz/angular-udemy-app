import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Server } from './state/servers.model';
import { ServersService } from './state/servers.service';

export const serversResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Server | null => {
  const serversService = inject(ServersService);

  const server = serversService.getServer(route.paramMap.get('id'));

  if (server) {
    return server;
  }

  return null;
};
