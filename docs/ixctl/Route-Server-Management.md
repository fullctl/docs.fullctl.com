# Route Server Management

The route server is deployed via podman containers under the root user.

Running `podman ps` as root should show two containers running, `fullctl_routeserver` for the bird instance itself and `fullctl_birdrefresh` for a process that manages the config synchronization.

``` sh
fullctl_routeserver
fullctl_birdrefresh
```

Both containers are controlled by two systemd units and can be managed like any other service:

``` sh
systemctl status fullctl-routeserver.service
systemctl status fullctl-birdrefresh.service
```

Stop bird completely:

``` sh
systemctl disable --now fullctl-routeserver.service
systemctl disable --now fullctl-birdrefresh.service
```

Start bird completely:

``` sh
systemctl enable --now fullctl-routeserver.service
systemctl enable --now fullctl-birdrefresh.service
```

List sessions:

``` sh
podman exec -it fullctl_routeserver /srv/bird/sbin/birdc show protocols
```

Bird logs to the system journal and to flat files that are periodically rotated:

``` sh
tail -F /srv/fullctl/rs/bird/var/log/bird.log
```

The current bird config is also available outside the container at `/srv/fullctl/rs/bird/etc/bird.conf`.
