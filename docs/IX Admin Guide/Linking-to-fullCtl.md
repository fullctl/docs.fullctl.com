# Linking to fullCtl, Installing and Testing Your Containers

For VMs or basemetal, ixCtl uses systemd to download and manage it’s containers. You can paste this configuration into /etc/systemd/system/fullctl-routeserver.service. If your route server systems require the use of a proxy or other configuration specific to your environment, you can update this template as needed. ixCtl route servers are further configured by a .env file detailed below.

[Unit]
Description=fullctl-routeserver.service
Documentation=https://docs.fullctl.com
Wants=network-online.target
After=network-online.target
RequiresMountsFor=%t/containers

[Service]
Environment=PODMAN_SYSTEMD_UNIT=%n
# if you need to use a proxy, uncomment and update these lines
#Environment=http_proxy="http://proxy.local:8080/"
#Environment=https_proxy="http://proxy.local:8080/"
Restart=always
TimeoutStopSec=70
ExecStartPre=/bin/rm -f %t/%n.ctr-id
ExecStart=/usr/bin/podman run \
	--cidfile=%t/%n.ctr-id \
	--cgroups=no-conmon \
	--sdnotify=conmon \
	-d -it \
	--replace \
	--env-file /srv/fullctl/rs/.env \
	--network=host --privileged -p 179:179 \
	-v /srv/fullctl/rs/bird/etc:/srv/bird/etc:Z \
	-v /srv/fullctl/rs/bird/var:/srv/bird/var:Z \
	--name fullctl_routeserver \
	localhost/fctlrs bird_only  update this for container location Matt Griswold
ExecStop=/usr/bin/podman stop --ignore --cidfile=%t/%n.ctr-id
ExecStopPost=/usr/bin/podman rm -f --ignore --cidfile=%t/%n.ctr-id
Type=notify
NotifyAccess=all

[Install]
WantedBy=default.target

Next, create the directory structure needed by fullCtl route servers:

sudo mkdir -p /srv/fullctl/rs/bird/var/run
sudo mkdir -p /srv/fullctl/rs/bird/etc


Then edit /srv/fullctl/rs/.env, updating this template as needed:

FULLCTL_IDENTIFIER=config/routeserver/<YOUR ORGANIZATION>/<YOUR IXP>/<RS IDENTIFIER>
# create your API keys from the user or organization screen of FullCtl.
FULLCTL_API_KEY=<YOUR API KEY>
FULLCTL_URL_ROOT=https://ix.fullctl.com/api
FCTLRS_IMAGE=quay.io/20c/dev-fctlrs


To download the latest version of the route server container, execute

sudo podman pull quay.io/20c/dev-fctlrs:latest  add command to push pulled container to local repo here Matt Griswold


Finally, use systemctl to launch the container:

sudo systemctl start fullctl-routeserver


ixCtl uses a separate systemd process to pull configuration updates from FullCtl. To enable this, crate another systemd service file at /etc/systemd/system/fullctl-birdrefresh.service:

[Unit]
Description=FullCtl bird config updater
Documentation=https://docs.fullctl.com
Wants=network-online.target
Requires=fullctl-routeserver.service
After=network-online.target fullctl-routeserver.service
RequiresMountsFor=%t/containers

[Service]
Environment=PODMAN_SYSTEMD_UNIT=%n
# if you need to use a proxy, uncomment and update these lines
#Environment=http_proxy="http://proxy.local:8080/"
#Environment=https_proxy="http://proxy.local:8080/"

Restart=always
TimeoutStopSec=70
ExecStartPre=/bin/rm -f %t/%n.ctr-id
ExecStart=/usr/bin/podman run \
	--cidfile=%t/%n.ctr-id \
	--cgroups=no-conmon \
	--sdnotify=conmon \
	-d -it \
	--replace \
	--env-file /srv/fullctl/rs/.env \
	-v /srv/fullctl/rs/bird/etc:/srv/bird/etc:Z \
	-v /srv/fullctl/rs/bird/var:/srv/bird/var:Z \
	--name fullctl_birdrefresh \
	localhost/fctlrs watch_config Matt Griswold update container location here
ExecStop=/usr/bin/podman stop --ignore --cidfile=%t/%n.ctr-id
ExecStopPost=/usr/bin/podman rm -f --ignore --cidfile=%t/%n.ctr-id
Type=notify
NotifyAccess=all

[Install]
WantedBy=default.target


Then use systemctl to launch the container:

sudo systemctl start fullctl-birdrefresh


You can use podman ls to confirm your containers are operational. 

Once you’ve confirmed everything is working, use systemctl to enable the fullctl-routeserver and fullctl-birdrefresh services:

sudo systemctl enable fullctl-routeserver fullctl-birdrefresh


