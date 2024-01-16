# FullCtl documentation site

Production is at https://docs.fullctl.com/ which is the `release` branch and is automatically deployed from changes to that branch.

## Development

To run on local, after setting up ssh to <git.20c.com>, run:

```sh
poetry install --with insiders
```

to install depenedencies with the `mkdocs-material-insiders` theme.

Then run:

```sh
poetry run mkdocs serve
```
