# Device Configuration

To view the current device configuration, click Show Config. The Show Config option at the top of the page provides access to the configuration settings for all the networks on the page. The Show Config option next to each network provides access to the configuration settings only for that particular network.
   ![](img/twoconfigs.png)


The configuration specifications for the chosen Template will appear in the pop-up box. It can be copied for pasting into router configurations using the Copy to Clipboard option at the bottom of the box.

Note: The following variables autofill into the email based on your network settings. These variables should not be edited.

Example: https://github.com/20c/netom/blob/master/src/netom/templates/netom0/bird1-0/bgp/neighbors.j2
`device.type` - device type

`peer_groups` - a `dictionary` of peers with group name as key

	`peer.peer_as` - ASN of the peer
	`peer.name` - Name of the peer
	`peer.neighbor_address` - ip address of neighbor
	`peer.local_as` - local asn
	`peer.auth_password` - md5
	`peer.max_prefixes` - max number of prefixes
	`peer.import_policy` - import policy
	`peer.export_policy` - export policy

   ![](img/configcodepopup.png)


The information in the device configuration is based on the chosen Policy and the settings chosen for Device Type and Template.
   ![](img/typetemplate.png)


After choosing your Device Type from the drop-down menu, choose the desired Template. Templates can be added or edited using the Templates tab.
   ![](img/templates.png)


Choose the Device Templates tab.
   ![](img/devicetemplates.png)


Edit or delete existing Templates using the options on the left.
   ![](img/edittemplate.png)


Add a new Template by entering a Name, choosing the Type from the drop-down menu, editing the text in the Body and clicking Save.
   ![](img/addtemplate.png)


The newly added Template will appear in the Templates list. It can be edited or deleted from here. It will also appear in the drop-down menu on the View Configs pop-up box. The configuration specifications for the new Template will appear in the pop-up box. It can be copied for pasting into router configurations using the Copy to Clipboard option at the bottom of the box.
   ![](img/sampletemplate.png)
   ![](img/samplepopup.png)