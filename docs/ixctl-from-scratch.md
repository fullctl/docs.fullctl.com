
# ixctl From Scatch

## Goals

## Inventory

- 3 Centos 8 Stream servers (Dell R620s)
    - 2x E5-2620 0 @ 2.00GHz, 32G ram
    - 2x 500G boot disks, mdraid1, lvm
    - 2x 1T data drives
- 2 Cisco Nexus9000 93180YC-EX running nxos.7.0.3.I7.3
- 2 Juniper EX4200-48T (mgmt/1G ports)

## environment setup
- internet access from at least 1 server
- 
## Server Setup
  - install container system

Centos 8:
```shell=
dnf install podman
```

## ixctl Setup

- configure container networking
- switch setup
- tie servers to ixctl?
- services on servers?
