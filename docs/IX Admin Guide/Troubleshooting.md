# Troubleshooting

ixCtl route servers are set up to download their configuration to the host system and access it via a shared mount. This makes it easy to view your route server configuration in /srv/fullctl/rs/bird/etc/bird.conf.

To view the route servers active status:

    sudo podman exec -it fullctl-routeserver /srv/bird/sbin/birdc show proto

To tail route server logs:

    sudo podman exec -it fullctl-routeserver tail /var/log/bird.log

For serious troubleshooting, launch a shell in the routeserver containers with:

    sudo  podman exec -it fullctl-routeserver bash

and simply exit when done.
