# Workflow

> [IMPORTANT!]
Use the standard mentorHub workflow, see [Software Engineer Workflow](https://github.com/agile-learning-institute/mentorHub/tree/main#software-engineer-workflow) for details. You should test both locally and containerized code before submitting a pull request.

## mentorHub MongoDB Collection Standards

- Every collection has a name attribute with a unique index
- Every collection has a status attribute with at least ``Active`` and ``Archived`` status. Archived is our soft-delete indicator.
- Every collection has a version document with a name and version attribute. Ther name of the version document is ``VERSION``
- Something about testdata and $oid

## mongosh execution entry Points

- The ``entrypoint.sh`` script is run on container startup, and iterates over all the files in the ``config`` folder and runs ``migrate.js`` for each one.
- The ``test.sh`` script will setup and run ``entrypoint.sh`` locally.

## monghsh file structure

The following directories are in the ``mongosh`` folder

- ``config`` Contains configuration files, one for each collection
- ``data`` Contains test data to be loaded, one for each collection.
- ``schemas`` Contains schema files, one for each version of each collection, named colection-version.
- ``modules`` Contains javascript modules and migration scripts

## Configuration File Structure

Each config file is a json data file, that describes a collection to be initilizred.

```json
{
    "name": "documents",        // Collection Name
    "version": "1.0.0",         // Version to Initilize
    "migrations": [             // Migration scripts
        "documents-1.0.0-to-1.0.1.js",
        "documents-1.0.1-to-1.2.0.js",
    ]
}
```

NOTE: Migration script support is not yet implemented.

## Testing changes locally

From the `src` directory, run `test.sh` like so

```bash
./mongosh/test.sh
```

## Building and testing the container

Use the following command from the project root directory to build and run the container locally. See [here](https://github.com/agile-learning-institute/mentorHub/blob/main/docker-configurations/README.md) for details on how to start and stop the database.

```bash
./src/docker/docker-build.sh
```

If the command completes without error, you can verify it worked successfully by:

- Checking the logs from your mentorhub-mongosh container
- Connecting to the database with the Mongo Compass to inspect the collections and data
