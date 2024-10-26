## Mapshot Manager and Microsite

This repository builds tooling for managing a Mapshot microsite. The rough idea is:

* You use mapshot, like normal, to generate your maps based on saves.
* You copy the mapshots into another directory that this repository manages.
* You add in files and frontend components to that directory to add in extra layers.
* You upload that whole combined directory to S3 to be hosted in CloudFront as a static site.

Presto! You now have a mapshot managed site.