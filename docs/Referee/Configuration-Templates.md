# Configuration Templates

The new device configuration files are rendered from templates defined in the `templates` directory that is a part of the `production` Repository. The templates use a Jinja2 templating engine to produce the resulting configuration. Some features and configuration blocks are defined in separate template files that are dynamically included in the main template.

The main template for each device is determined by the device platform and the platform-specific template named `main.j2` is found in the `templates/platform` subdirectory. Currently, only Cisco IOS/IOS XE (“ios”), Cisco IOS XR (“iosxr”) and Cisco Nexus (“nxos”) platforms are supported.

After the main template is rendered for each device, the additional host-specific template is loaded from the `templates/host` subdirectory and the rendered configuration is appended to the final configuration for the given host.

### Supported Configuration Options in YAML Templates
**Access Control Lists (ACLs)**

One or more ACLs can be defined under the top-level key `acl`. Each defined ACL must have a name and a list of rules. Remarks are optional.

IPv6 ACLs must have `afi` attribute set to `v6`. This is not required for IPv4 ACLs. Alternatively, one of the following name suffixes sets the `afi: -v4, _v4, -v6, _v6.` ACLs that have one of these suffixes in their name do not need to have `afi` set explicitly.

Example:

```
acl:
  - name: SSH
    rules:
      - remark Allow all SSH
      - permit tcp any any eq 22
  - name: HTTP
    rules:
      - permit tcp any any eq 80
  - name: ICMPv6
    afi: v6
    rules:
      - permit icmp any any
  - name: DATACENTER_v6
    rules:
      - permit ip any 2001:DB8::/32
```

**Banner**

A banner is defined as a list of lines that make up the banner. Wrapping each line in quotes (both single and double quotes work) helps prevent problems with certain special characters (e.g., colon that is otherwise interpreted as part of YAML syntax). 

Example:

```
banner:
  - "WARNING: You have accessed a network device."
  - "You are required to have a personal authorization from the system"
```

**BGP Networks**

A list of networks to be advertised in BGP. 

Example:

```
bgp_networks:
- name: network
  prefix: 192.0.2.0/24
- prefix: 2001:DB8::/32
```

**BGP Sessions**

One or more BGP sessions are defined under the `bgp_sessions` key. All attributes in the example below are implemented, though not all of them are mandatory (optional attributes have been left blank). Example:

```
bgp_sessions:
  - peer_asn: 65001
    peer_ip4: 192.0.2.2
    peer_ip6: 2001:DB8::2
    peer_name: Peer X
    peer_session_type: transit
    policy4_export:
    policy4_import:
    policy4_peer_group:
    policy6_export:
    policy6_import:
    policy6_peer_group:
    port_is_ix: false
```

**Callhome**

The callhome block of Cisco configuration can be defined line by line under the `callhome` key. 

Example:

```
callhome:
  - contract-id 1234
  … (shortened for brevity)
  - transport http use-vrf management
  - enable
  - periodic-inventory notification interval  30
```

**CDP**

CDP can be enabled/disabled globally (for a device) under the top-level cdp key. 

Example that disables it:

```
cdp:
  enable: false
```

**DNS Servers**

A list of DNS servers is defined under the top-level `dns_servers` key. 

Example:

```
dns_servers:
  - address: 8.8.8.8
  - address: 8.8.4.4
  - address: 1.1.1.1
```

**NTP**

NTP servers and other NTP configuration is defined under the top-level key `ntp`. Note that the list of NTP `servers` is nested under servers as there are more options (logging, peer_acl) compared to DNS servers. 

Example:

```
ntp:
  servers:
    - address: 203.0.113.1
    - address: 203.0.113.2
  logging: true
  peer_acl: NTP-ACL
```

**Prefix sets**

One or more prefix sets (prefix lists in Cisco terminology) can be defined under the top-level key `prefix_sets`. Each prefix set must have a `name` and a list of `rules`. `Family` is required only for IPv6 prefix sets. 

Example:

```
prefix_sets:
  - name: prefix_set_1
    rules:
      - permit 203.0.113.0/24
      - permit 0.0.0.0/0
  - name: prefix_set_2
    family: v6
    rules:
      - permit 2001:DB8::/32
```

**Route maps**

One or more route maps can be defined under the top-level key `route_maps`. A route-map must have a `name` and a list of `rules`. Each rule must have an `action` as either `permit` or `deny` and a `match` attribute with the condition to match in the given rule.

Note that only a simplified form of route-maps is supported. `Set` statements are not implemented.

Example:

```
route_maps:
  - name: FULLCTL_TEST
    rules:
      - action: permit
        match: ip address MANAGEMENT-PROTOCOLS
      - action: deny
        match: ip address prefix-list PREFIX_LIST_DENY
```

This results in the following configuration:

```
route-map FULLCTL_TEST permit 10
  match ip address MANAGEMENT-PROTOCOLS
route-map FULLCTL_TEST deny 20
  match ip address prefix-list PREFIX_LIST_DENY
```

**SNMP**

SNMP-related configuration can be defined under the top-level key `snmp_server`. Global config options `contact` and `globalEnforcePriv` are implemented, as well as a list of users.

Example:

```
snmp_server:
  contact: NOC
  globalEnforcePriv: true
  users:
    - user: admin network-admin auth md5 … priv des … localizedkey
    - user: cisco network-admin auth md5 … priv aes-128 … localizedV2key
```

**SW Features**

Applicable to NX-OS, software features can be activated under the `features` top-level key. 

Example:

```
features:
  - nxapi
  - bash-shell
  - scp-server
  - bgp
  - pbr
  - interface-vlan
  - lacp
  - sflow
  - nat
```
