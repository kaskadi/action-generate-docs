[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-generate-docs/build?label=build&logo=mocha)](https://github.com/kaskadi/action-generate-docs/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-generate-docs?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-generate-docs?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-generate-docs?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-generate-docs?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-generate-docs/?mode=list)

****

# What is this action for?

a GitHub action that allows you to automatically generate Markdown documentation

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
      uses: kaskadi/action-generate-docs@master
      with:
        type: {TYPE-VALUE}
        template: {TEMPLATE-VALUE}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|    Input   | Required | Default | Description                                                                                                    |
| :--------: | :------: | :-----: | :------------------------------------------------------------------------------------------------------------- |
|   `type`   |  `true`  |         | type of repository to generate the documentation for                                                           |
| `template` |  `false` |         | the handlebars (.hbs) template you would like to use. The documentation will be injected in place of {{>main}} |

**In order to sign the commit for your newly generated docs via GPG**: add the following `step` before the actual documentation generation step:
```
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
```

**If you do not need to sign your commit via GPG**: simply replace the `Import GPG key` step of the job by:
```
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```
