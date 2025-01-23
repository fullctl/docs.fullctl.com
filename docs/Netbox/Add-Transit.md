# Add Interface

Go to the device you’d like to add the interface to and click Add Components and then Interfaces
   ![](ing/peergroupstab.png)

Note that added interfaces are automatically added into device configuration by Referee. Make sure that the interface type and number match the physical and logical interfaces supported by the device.

If it’s a LAG, add the LAG interface first.
   ![](ing/lag.png)

Then add the physical interfaces.
   ![](ing/physical.png)

Note: Interfaces removed from Netbox are ignored by Referee. No cleanup (e.g. “no interface x/y/z” or “default interface y/x/z”) in FullCtl is triggered automatically. Rather than remove an interface from Netbox the configuration in Netbox should be changed. 

## Bind Interface to Peering Port
In most cases, the Peering Port will match the IP address of the interface and automatically bind them together. If you need to do it manually, you do it from the Peering configuration in PeerCtl.

[See instructions for adding new policy in PeerCtl](../PeerCtl/Set-Policy-Device-Type.md)  
