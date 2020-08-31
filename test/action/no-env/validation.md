# What is this action for?

this is a test action

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
      uses: kaskadi/test-action@master
      with:
        input1: {INPUT1-VALUE}
        input2: {INPUT2-VALUE}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|   Input  | Required | Default | Description |
| :------: | :------: | :-----: | :---------- |
| `input1` |  `true`  | `hello` | input 1     |
| `input2` |  `false` |         | input 2     |

**Outputs:**
|   Output  | Description |
| :-------: | :---------- |
| `output1` | output 1    |
| `output2` | output 2    |
