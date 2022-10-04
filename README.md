# CI/CD Academy

This repository has been set up to accompany the working sessions to understand a create CI/CD pipelines.

## Github Actions

### Triggering actions execution

#### Push

```
  on:
    push:
      branches:
        - main
```

This demonstrates execution on a push taking place. This is configured to only run on the main branch.

#### Pull Request

```
  on:
    pull_request:
      branches:
        - main
```

This demonstrates execution on a pull request taking place. This is configured to only run when a pull request is created against the main branch.

#### Path

```
on:
  [pull_request, push]:
    paths:
      - "api/**"
```

This demonstrates how we can conditionally trigger based on the location of files changes. In this example only changes within the `api` directory will trigger this action. It is possible to specify many different `paths`.

### Defaults

```
defaults:
  run:
    working-directory: ./api
```

It's possible with defaults to set both the `working-directory` and the `shell` used. This is handy for when the Action is only using a specific directory and saves having to set relative paths using the working directory target.

### Secrets

```
  - run: 'echo "my secret is: $SSH_KEY" > key'
    shell: bash
    env:
      SSH_KEY: ${{secrets.SSH_KEY}}
  - run: "cat key"
```

This action demonstrates using a secret within an action. Secrets are stored within Settings > Secrets > Actions. It's possible to set secrets at a repository and organisation level (organisation for sharing between repositories).

### Act

Act is a great way to develop GitHub Actions locally before uploading and utilizing available resouces. It also runs considerably faster and with fewer workflow steps lending well to rapid development of actions. Details can be found [here](https://github.com/nektos/act).

Typically however I will use `act -l push|pull_request` to determine which actions are available and then `act -j JobName` to execute specific jobs.

It’s also common to emulate events based on you current branch with `act push|pull_request` and additionally use secrets with `-s SECRET_KEY=SECRET_VALUE`.

### Docker

#### Development with docker

Development with docker can bring many advantages; the main one being a highly predictable local development environment for a team. In this example below we can use profiles to set compose services that are only included for the dev profile:

`docker compose --profile dev up`

```
  api:
    profiles: ["dev"]
    build:
      context: ./api
      dockerfile: dockerfile.local
    volumes:
      - ./api:/app
    ports:
      - "3000:3000"
    depends_on:
      - flyway
```
