# CI/CD Academy

This repository has been set up to accompany the working sessions to understand a create CI/CD pipelines.

## Github Actions

To get some real world examples of CI/CD I've included some basic actions:

- test-push:
  This action demonstrates execution on a push taking place. This can be configured to only run on specific branches.

  ```
    on:
        push:
            branches:
                - main
  ```

- test-pr:
  This action demonstrates execution on a pull request taking place. This can be configured to only run on PRs raised to specific branches.

  ```
    on:
        pull_request:
            branches:
                - main
  ```

- test-secret:
  This action demonstrates using a secret within an action. It also shows the level that Github will go to, to prevent secrets being printed.
  ```
    
  ```