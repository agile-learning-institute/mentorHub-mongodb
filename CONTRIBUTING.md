# Workflow

> [!IMPORTANT]
> The `main` branch is locked as read-only. You should do all work in a feature branch, and when you are ready to have your code deployed to the cloud open a pull request against that feature branch. Do not open a pull request without first building and testing the containers locally.

For more information on workflow, see [Software Engineer Workflow](https://github.com/agile-learning-institute/mentorHub/tree/main#software-engineer-workflow)

# Testing changes locally

From the `src/mongosh` directory, run `test.sh` like so

```bash
./test.sh
```

## Building and testing the container

Use the following command to build and run the container locally. See [here](https://github.com/agile-learning-institute/mentorHub/blob/main/docker-configurations/README.md) for details on how to start and stop the database.

```bash
../src/docker/docker-build.sh
```

If the command completes without error, you can verify it worked successfully by:

- Checking the logs from your mentorhub-mongosh container
- Connecting to the database with the Mongo Compass to inspect the collections and data
