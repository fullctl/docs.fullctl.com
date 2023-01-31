# FullCtl Component Overivews

**aaaCtl**

aaaCtl provides centralized authentication, authorization and accounting for FullCtl. It is the centralized authentication service for FullCtl and it contains all RBAC (Role Based Access Control) identity information. You will interact with aaaCtl to add, remove, or change the permissions for all FullCtl users. FullCtl users include anyone or anything that will make network configuration changes. We say anyone or anything because the FullCtl IBN solution will allow applications to make network changes via API, in addition to users making changes via the various SoT GUIs.

**aclCtl**

aclCtl is the FullCtl source of truth for access control list (ACL) and network policy information. It is used for managing traffic filtering and device security. aclCtl manages two components; both ACL structure (traffic filtering rules) and the application of those filters. It is expected that ACL structure will change infrequently and that the application of those policies will change more often. For example, if a new service is added to a PoP (Point of Presence) the ACL itself will not change, rather that new service will be added to comply with existing rule-sets. This allows for the automation of service turn up without human intervention.

**ixCtl**

ixCtl is an automation platform built for internet exchange operators. Using our member management features, import your existing connected network list from PeeringDB or enter it manually, then use ixCtl to manage MAC addresses, IP addresses, or export as an IX-F connected networks list schema. ixCtl has an open source version designed as a toolkit to enhance flexibility for Internet Exchanges. An IX can run individual components as desired while still allowing for custom, granular integrations with limitless possibilities.

ixCtl takes data directly from PeeringDB and combines it with industry best practices to generate (and maintain) secure route server configurations. ixCtl automatically updates route server configurations over time as connected networks update their information. ixCtl is an excellent source of truth for wider automation efforts. When you deploy ixCtl at your IX, all of your connected networks get access to the PeerCtl dashboard to automatically update their mac addresses and as-sets directly.

**PeerCtl**

PeerCtl is an automation platform purpose built for busy peering managers. As part of the broader FullCtl IBN solution, PeerCtl is the SoT for interconnection and peering. It is used for managing all external BGP sessions with peers and transit providers.

PeerCtl takes data directly from PeeringDB, combines it with your policies, and generates the complete BGP configuration required to turn up a secure and reliable peering session. PeerCtl also provides email templates for each common communication point, along with a workflow to help you turn up new peers. Also, if the IX you’re working with uses ixCtl, you can use PeerCtl to update your mac address and as-set.

**PrefixCtl**

PrefixCtl is the FullCtl SoT for prefix sets needed in BGP routing. It is used for managing IRR (Internet Routing Registry) and ROA (Route Origin Authorization) information. This enables third-parties to automatically (or manually) create filters that will always allow your BGP announcements. PrefixCtl also provides a reputation monitor, which notifies you any time your address space is reported for abuse (SPAM origination, etc).

**DeviceCtl**

DeviceCtl is a FullCtl SoT designed to manage devices and how they interconnect. DeviceCtl is leveraged for instances where Nautobot functionality falls short. Therefore, your implementation may or may not require deviceCtl. When it is present, it is used for all inventory management tasks, to avoid any possible duplication or confusion.
