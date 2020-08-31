# What is this action for?

{{>description}}

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/{{>name}}@{{>branch}}

```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
{{>inputs}}{{>outputs}}{{>env}}