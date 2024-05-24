# Route Server Management

## Managing the route server containers

The route server is deployed via podman containers under the root user.

Running `podman ps` as root should show two containers running, `fullctl_routeserver` for the bird instance itself and `fullctl_birdrefresh` for a process that manages the config synchronization.

``` sh
fullctl_routeserver - bird instance itself
fullctl_birdrefresh - process that manages config synchronization and heartbeats
```

Both containers are controlled by two systemd units and can be managed like any other service, with standard systemd commands:

`status`, `start`, `stop`, `disable --now`, `enable --now`

To stop bird for mantainence, such as when rebooting the machine for os updates, it is best to disable both services to prevent unnecessary flapping, and re-enable once you are ready for bird to remain running.

``` sh
systemctl <command> fullctl-routeserver.service
systemctl <command> fullctl-birdrefresh.service
```

## Interacting with Bird

See the [Bird Documention](https://bird.network.cz/?get_doc&v=20&f=bird-4.html) for a full list of available commands.

There is a helper script at `/usr/local/bin/birdc.sh` to assist with running standard bird commands within the context of the containers.

For example listing the status of current sessions:

``` sh
birdc.sh show protocols
```

In the absense of the `birdc.sh` script the same commands can be run manually within the container via the podman cli.

``` sh
podman exec -it fullctl_routeserver /srv/bird/sbin/birdc show protocols
```

Other commonly used bird commands

``` sh
birdc.sh show protocols all
birdc.sh show protocols all <bgp-name>
birdc.sh show route
```

## View logs and the current configuration

The current bird config is available outside the container at `/srv/fullctl/rs/bird/etc/bird.conf`

Bird logs are also available directly at `/srv/fullctl/rs/bird/var/log/bird.log`

Additionally logs for both containers `fullctl_routeserver` and `fullctl_birdrefresh` are viewable via the system journal or directly through the podman cli.

```sh
journalctl -t fullctl_routeserver -f
```

```sh
podman logs -f fullctl_routeserver
```

The running log is rotated via the host `/etc/logrotate.d` service

```sh
/srv/fullctl/rs/bird/var/log/bird.log {
    weekly
    rotate 4
    nocompress
    copytruncate
}
```

Logging can be configured via /srv/fullctl/rs/bird/etc/logging.local

```sh
log "/srv/bird/var/log/bird.log" all;
log syslog all;
```
