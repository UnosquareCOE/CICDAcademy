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

### Defaults

```
defaults:
  run:
    working-directory: ./api
```

### Secrets

```
  - run: 'echo "my secret is: $SSH_KEY" > key'
    shell: bash
    env:
      SSH_KEY: ${{secrets.SSH_KEY}}
  - run: "cat key"
```

This action demonstrates using a secret within an action. It also shows the level that Github will go to, to prevent secrets being printed.

### Act

Act is a great way to develop GitHub Actions locally before uploading and utilizing available resouces. It also runs considerably faster and with fewer workflow steps lending well to rapid development of actions. Details can be found [here](https://github.com/nektos/act).

Typically however I will use `act -l push|pull_request` to determine which actions are available and then `act -j JobName` to execute specific jobs.

It’s also common to emulate events based on you current branch with `act push|pull_request` and additionally use secrets with `-s SECRET_KEY=SECRET_VALUE`.
