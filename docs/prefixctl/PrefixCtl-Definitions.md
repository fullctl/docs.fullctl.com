# PrefixCtl Definitions

## Overview

PrefixCtl is the FullCtl SoT for prefix sets needed in BGP routing. It is used for managing IRR (Internet Routing Registry) and ROA (Route Origin Authorization) information. This enables third-parties to automatically (or manually) create filters that will always allow your BGP announcements. PrefixCtl also provides a reputation monitor, which notifies you any time your address space is reported for abuse (SPAM origination, etc).

## Definitions

**IRR Integration** - Internet Routing Registry. When automatic IRR import is enabled the prefixes in this prefix set are managed automatically.

**Prefix** - An aggregation of IP addresses.

**Prefix Set** - A group of unique Prefixes.

## Reputation Checking

Reputation Checking is not available by default. Users must request and be granted access to use this feature.

**Data Sources** - Data Sources include reputation checking, routing and geolocation information, and registration information. The current list of Data Sources checked can be found at the bottom of a Reputation Report.

**Reputation Invalid** - One or more of the sources failed during the generation process.

**Reputation Issues** - One or more of the Prefixes is flagged. The Reputation Report will identify the issue and source.

**Reputation Monitor** - The email address entered for a Reputation Monitor will receive updates about a Prefix Set. There is an option to receive a daily update or an update only when there is a status change in the Prefix Set.

**Reputation Okay** - All of the Prefixes checked were clean (no issues).

**Reputation Report** - A summary of information about each Prefix checked and the Data Sources used.
