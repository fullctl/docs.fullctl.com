# Making Changes

Referee ties device configuration into the FullCtl system. It is bi-directional so when you update a SoT, Referee checks it before pushing out to the network. It also looks for changes on the network and compares those with the SoT. In other words, Referee orchestrates both the configuration change process and the configuration validation process.

For configuration; when Referee identifies a change in a SoT, it creates the required merge request to apply those changes using conditions based on what is changing. Those conditions determine the exact steps for the CI/CD pipeline to execute. For example, changes that are considered “risky” could require human approval whereas changes considered “safe” will bypass human approval and execute fully automatically.

For validation; when Referee identifies a change between any device’s running configuration and the known good running configuration in the validation repository it creates a new merge request in the `production` Repository. **NOTE:** Configuration that was intentionally removed from device running configuration must be also removed in the appropriate source of truth for this configuration, otherwise Referee will initiate the process to reapply the removed configuration.

Referee is a process that runs regularly. The frequency can be set on a per organization basis.

With Referee, you can login to the devices and make changes as you normally would, and Referee will step out of the way until changes are trued up to what it expects so it can take over. Once Referee verifies that the config is as it expects, it processes the full source of truth database layers and builds the Golden Source of Truth. It uses that information to generate a reference configuration which it compares to its current reference copy. 

If that matches, there’s nothing left to do and it sleeps to wait for the next signal.

If the generated config does not match, it needs to make changes so it pushes a branch and Merge Request to the configured `production` Repository signaling the need for someone to verify and approve the changes. Any changes made before the MR is approved are queued and combined so there can be an atomic approval and deployment.

When the changes are approved, Referee will pick them up and push them to the devices.

### Make Configuration Change in the SoT and Approve

1. Log into aaaCtl/FullCtl.
2. Log into Netbox. 
3. Log into Git.
4. In Netbox, click on Interfaces. 
5. Click on a device and make changes in the modal. The changes will appear in Nebox but not to the configuration. 
6. Referee will find the change and create a merge request in the Git `production` Repository before the change is pushed into the device. 
7. Open `production` Repository and review the request.
   
- If approved, it will be pushed to the device (you can then see this in the config).
- If denied, the merge request is closed and the config change is not pushed to the device but it remains in the system.
  
**Note:** When Referee runs again it will create another merge request, the same that was just rejected. At the time of the rejection, Referee does not know where the rejected configuration came from (Netbox/other) and does not know how to undo the change. The change must be approved or removed from the system manually by reverting the configuration in whatever system it originates.

8. The change will also appear in DeviceCtl in the Ports tab under Device Details - Current Config. You may need to hard refresh DeviceCtl to see the change appear after the merge is approved. 

### Detect a Change of Configuration to a Network Device

When Referee is run, it first checks whether the device configuration has changed compared to its last known configuration. If changes are detected, it indicates that the configuration has been altered outside of the system. At this point, Referee can either automatically save and overwrite the existing configuration or pause, requiring manual intervention before proceeding. A merge request is generated when changes are detected. The merge request will be in the `production` Repository. If the changes are made in two different sources they will show in two different merge requests. 

- If approved, the config change is merged into the repository. 
- If denied, the merge request is closed. Note: The configuration must be cleared/reverted or Referee will continue to find it and create merge requests. 

### Make a Configuration Change Directly in the Central Repository

**Option 1 (preferred): Making a Configuration Change to the YAML File**

This option is preferred over the Snippet option because Snippets must be customized to the device. 
To make a change:

1. Open the Repository and click on the Repository files. 
2. Go to the YAML directory and find the file to be edited. 
3. Click on the button called Web IDE to trigger the drop down menu. Click on Edit from the drop down menu. 
4. Enter information into the text field. 
5. Referee will then compare the changes in order to apply the change. A merge request will be generated.
6. Open the Repository and review the request.
    a. If approved, it will be pushed to the device (you can then see this in the config).
    b. If denied, the merge request is closed and the config change is not pushed to the device but it remains in the system. Note: When Referee runs again it will create another merge request. The change must be approved or removed from the system.

**Option 2: Make a Configuration Change to a Snippet**

This is done through the snippets directory in Referee. When snippets are used the correct syntax must be used. If there are any inaccuracies in the syntax, the other changes made with them will fail as well. This should be used as a last resort.
To make a change:

1. Open the Repository and click on the Repository files. 
2. Go to the Snippets directory and find the file to be edited. 
3. Click on the button called Web IDE to trigger the drop down menu. Click on Edit from the drop down menu. 
4. Enter information into the text field. 
5. Referee will then compare the changes in order to apply the snippet. A merge request will be generated.
6. Open the Repository and review the request.
   a. If approved, it will be pushed to the device (you can then see this in the config).
   b. If denied, the merge request is closed and the config change is not pushed to the device but it remains in the system. **Note:** When Referee runs again it will create another merge request. The change must be approved or removed from the system.

**Errors (applies to changes made manually through YAML definitions and config Snippets)**

If an error is made when updating a device this will be reflected in DeviceCtl in the Ports tab under Device Details. The error message will include details of where the error occurred. DeviceCtl also lists the length of time the error has been in place. The Repository can be reviewed to locate the update that needs to be repaired. 

