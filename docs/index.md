# Introduction to FullCtl

FullCtl is a network automation and orchestration software suite focused on providing a source of truth for your network and provides a suite of tools to take actions and provide services based on that SoT.

In order to provide functionality for a variety of networks, FullCtl is made up of a number of modules. Some of these, like aclCtl, provide functionality to other modules, and some, like ixCtl provide interfaces and automation controllers directly. It should be noted that most modules do not act directly on your infrastructure, instead being communicated with by a variety of agents deployed in your infrastructure. These agents are typically containers providing services like route servers, but can also be proxy connections allowing your systems to securely communicate with FullCtl to obtain and act on information provided by the FullCtl SoT.

# Why use FullCtl?

FullCtl can take the hassle and complexity out of managing a complex infrastructure. Using our modules to track SoT, implement best practices like RPKI and ROAs, and provide backups can give you a leg up on managing your infrastructure in a secure and up to date manner.

# FullCtl Components

- aaaCtl - manage your users and access control to various components of FullCtl
- aclCtl - manage custom ACLs for router configuration
- ixCtl - manage your IXP users, configure your route servers and as112 systems
PeerCtl - take data directly from PeeringDB, combine it with your policies and generate the complete BGP configuration required to turn up a secure and reliable peering session
- PrefixCtl - enter your network prefixes and irr information to monitor and manage your networks
- DeviceCtl - manage your physical infrastructure, assign ports and logical configurations, and maintain a SoT for easy configuration and monitoring
- custom Ctl - you can integrate FullCtl’s SoT with your existing workflow or custom code through our rich API, or 20c can create custom integrations for your specific needs

# About this Documentation

FullCtl documentation is divided into two main sections. The first is a series of use case workflow guides to walk you through setting up and implementing common implementations such as an IXP. The second section is a reference guide to the various components and definitions as used by FullCtl. It is recommended that you read through a workflow guide that is appropriate to your use case, then use the reference guide as needed to get further information about the various modules.

Contact us: <a href="mailto: hello@20c.com" target="_blank">hello@20c.com</a>
