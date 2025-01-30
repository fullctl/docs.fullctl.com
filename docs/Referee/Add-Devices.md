# Add Devices

The second step to using Referee is to add Devices in Netbox. [How To](../Netbox/Add-Device.md)

If a device is created in Netbox it will propagate into DeviceCtl. The next time Referee runs it discovers the new device, adds it into the inventory file hosts.yaml and creates a merge request (MR) in `production` repository to approve this change. Once the MR is merged, the new device will be processed by Referee.

## Device Tags
Tags defined in Netbox that are assigned to devices propagate to DeviceCtl and ultimately to Referee. Tags allow arbitrary grouping of devices and specific configuration to be applied to the defined groups of devices. This allows YAML templates to apply specific configuration based on the geographic region, device role, or any other criteria.

Tag-specific configuration is defined in `yaml/load/tag` directory. Create a new subdirectory for each tag and place one or more YAML files in the subdirectory. The configuration will be applied to devices with the given tag assigned.
