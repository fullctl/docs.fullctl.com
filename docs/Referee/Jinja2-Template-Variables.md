# Jinja2 Template Variables

This section compiles the variables and descriptions found in each Jinja2 template, organized by their respective file paths.

### /platform/ios/interfaces.j2

- `interfaces`: List of interface configurations.
- `interface["name"]`: The name of the interface.
- `interface["description"]`: (Optional) Description for the interface.
- `interface["mtu"]`: Interface's Maximum Transmission Unit (MTU) setting.
- `interface["enabled"]`: Specifies if the interface is administratively up or down.
- `interface["ip4"]`: IPv4 address assigned to the interface.
- `interface["ip6"]`: IPv6 address assigned to the interface.
- `interface["lag_channel"]`: Link Aggregation Group (LAG) channel configuration for the interface (commented out).

### /platform/ios/vty.j2

- `sot.cli_access`: Configuration for CLI access, potentially including details for both Telnet and SSH.
- `sot.cli_access.telnet`: Specifies if Telnet access is enabled.
- `sot.cli_access.ssh`: Specifies if SSH access is enabled.
- Description: Configures VTY lines for remote management access, allowing or disallowing Telnet and SSH based on the `sot.cli_access` settings.

### /platform/ios/acls.j2

- `acls`: A dictionary containing ACL (Access Control List) configurations, each identified by a unique name.
- `acl.afi`: Address Family Identifier, indicating whether the ACL is for IPv4 or IPv6.
- `acl.name`: The name of the ACL.
- `acl.rules`: List of rules contained within an ACL.
- `acl_increment`: An incremental value used to assign sequence numbers to ACL rules.
- Description: Dynamically generates access control lists (ACLs) for IPv4 and IPv6, applying specific rules and increments to each.

### /platform/ios/main.j2

- `device.name`: Sets the hostname for the device.
- `sot.callhome`: Configuration block for potential call home features.
- Each entry in `sot.callhome` configures specific call home settings.
- `sot.users`: A list of device users.
- Contains configurations like `username`, `password`, `passphrase`, and `sshkey`.
- `sot.banner`: Configures the message of the day (MOTD) banner.
- `sot.cdp`: Enables or disables Cisco Discovery Protocol (CDP).
- `sot.dns_servers`: Configures DNS servers.
- Each entry contains an `address`.
- `sot.ntp`: Network Time Protocol (NTP) settings.
- Configures `servers`, `logging`, and `peer_acl` for NTP.
- `sot.snmp_server`: Simple Network Management Protocol (SNMP) server configuration.
- Configures `contact`, `globalEnforcePriv`, and SNMP `users`.
- `sot.ip_routes`, `sot.ipv6_routes`: Static routing configurations for IPv4 and IPv6.
- Each route includes a `prefix`, `next_hop`, and optionally `vrf`.
- `sot.object_groups`: Defines network object groups.
- Contains `type`, `name`, and `objects` within each group.
- `include` directives: Includes additional Jinja2 templates for interfaces, BGP neighbors, ACLs, prefix-sets, route-maps, and VTY configurations.
- Description: Serves as the main configuration template, orchestrating the inclusion and configuration of various network settings and features.

### /platform/ios/route-map.j2

- `sot.route_maps`: A dictionary containing route map configurations.
- Each route map is identified by a `name`.
- `route_map.rules`: List of rules within the route map.
- `rule.action`: Specifies the action (`permit` or `deny`) for the rule.
- `rule.match`: The match conditions for the rule.
- Description: Configures route maps with specific matching conditions and actions based on configurations defined in `sot.route_maps`.

### /platform/ios/prefix-set.j2

- `prefix_sets`: A dictionary of prefix set configurations.
- `each.family`: Specifies the address family (v4 for IPv4, v6 for IPv6).
- `each.name`: The name of the prefix set.
- `each.rules`: A list of rules or conditions associated with the prefix set.
- Description: Manages the creation and deletion of prefix lists for both IPv4 and IPv6, including specified rules for each set.

### /platform/ios/bgp/neighbors.j2

- Macros: `session_common_in4`, `session_common_out4`, `session_common_in6`, `session_common_out6`, `session_policies`, `session_description`.
- These macros define common configurations applied to BGP sessions, both for inbound and outbound traffic, specifically developed for handling IPv4 and IPv6 traffic.
- `device.asn`: The ASN (Autonomous System Number) of the device.
- `device.router_id`: The router ID used for BGP.
- `bgp_sessions`: A list of BGP session configurations.
- `session.port_is_ix`, `session.peer_session_type`, `session.peer_asn`, `session.policy4_peer_group`, `session.policy6_peer_group`, `session.peer_ip4`, `session.peer_ip6`, `session.policy4_import`, `session.policy4_export`, `session.policy6_import`, `session.policy6_export`: Variables that hold configurations specific to each BGP session.
- `session.peer_maxprefix4`, `session.peer_maxprefix6`: The maximum number of prefixes that can be received from a peer for IPv4 and IPv6.
- Description: Configures BGP neighbors and their sessions, leveraging macros to apply common settings. Specifies route policies for handling traffic, along with details on the BGP setup for the device.

### /platform/iosxr/interfaces.j2

- `interfaces`: List of interface configurations specific to IOS XR devices.
- Each interface configuration allows for detailed settings such as name, description, MTU, IP addresses, and specialized functions.
- `interface["name"]`: The name of the interface.
- `interface["external_fields"]["connection_type"]`, `interface["external_fields"]["peer_name"]`: Used for conditional descriptions based on connection type and peer name.
- `interface["description"]`: Description of the interface.
- `interface["mtu"]`: Maximum Transmission Unit for the interface.
- `interface["enabled"]`: Specifies if the interface should be administratively up (true) or down (false).
- `interface["ip4"]`, `interface["ip6"]`: Primary IPv4 and IPv6 addresses for the interface.
- `interface["ip4_secondaries"]`, `interface["ip6_secondaries"]`: Lists of secondary IPv4 and IPv6 addresses.
- `interface["lag_channel"]`: Configures the interface as part of a Link Aggregation Group (LAG).
- `interface["bridge"]`: Marks the interface for layer 2 transport.
- `interface["bgp_session"]`: Specific BGP session configurations related to the interface, including ACL applications.
- Description: Detailed interface configuration template for IOS XR, including naming, addressing, LAG participation, and optional BGP session settings.

### /platform/iosxr/base.j2

- Configuration of base aspects for IOS XR devices, focusing on control-plane, management-plane, and basic static routing.
- Management access via SSH and SNMP with specified addresses.
- Use of `sot.site_private_octet` to configure part of the management and static routing addresses dynamically.
- Potentially configures optical interfaces if `breakout` is defined.
- Description: Establishes foundational setup for an IOS XR device, including management plane configurations and basic routing, with support for conditional optical interface breakout configuration.

### /platform/iosxr/acls.j2

- `acls`: A dictionary of ACL (Access Control List) configurations for IOS XR.
- Each ACL is identified by a `name` and contains a list of `rules`.
- `slug`: A unique identifier for the ACL, with a default value of `DEFAULT`.
- `afi`: Address Family Identifier, indicating whether the ACL is for IPv4 (`v4`) or IPv6 (`v6`).
- `acl_increment`: Used to assign unique sequence numbers to each rule within an ACL.
- Description: Dynamically generates IPv4 and IPv6 access control lists for IOS XR devices based on specified rules and increments.

### /platform/iosxr/session-object-group.j2

- `session_object_groups`: A list of session object configurations for IOS XR.
- Utilizes `slug` to differentiate between local and peer configurations.
- Each object group configuration details IPv4 (`ip4`) and IPv6 (`ip6`) addresses, dynamically including object-group.j2 for detailed setup.
- Description: Manages session object groups specific to IOS XR, integrating closely with `object-group.j2` to define both local and peer-side object groups.

### /platform/iosxr/srv6.j2

- Focuses on Segment Routing over IPv6 (SRv6) configurations for IOS XR.
- Defines SRv6 specific BGP neighbors and route policies.
- Configures IS-IS routing protocol with SRv6 settings.
- `srv6["bgp_neighbors"]`: List of BGP neighbors relevant for SRv6 configurations.
- `device.site_slug`: Used in naming conventions for SRv6 locators.
- `sot.net`: Specifies the ISIS network entity title.
- `srv6_locator_v6`: SRv6 locator IPv6 prefix.
- `local_site_prefix_v4`: Local site prefix for IPv4 summarized routing.
- Description: Provides a comprehensive setup for SRv6 within an IOS XR network, incorporating IS-IS routing adjustments, BGP session configurations, and SRv6 locator setups.

