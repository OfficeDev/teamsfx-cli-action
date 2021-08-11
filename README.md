# GitHub Action for TeamsFx CLI


The TeamsFx CLI GitHub Action is an integration of [TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) commands, which helps Teams app developers to automate their CI/CD workflow.

More definition of Teams CLI GitHub Action is here in [action.yml](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/action.yml).

## Sample workflow 

### Dependencies on the project
Please make sure the project uses [TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) as its dev dependency in the root `package.json` like below:

`
  "devDependencies": {
    "@microsoft/teamsfx-cli": "^0.3.1"
  }
`

PS: This GitHub Action in version `v1` is compatible with TeamsFx CLI in range of `0.*`, and we recommend to use the lastest version of TeamsFx CLI.

### Dependencies on other GitHub Actions
* [Checkout](https://github.com/actions/checkout) – **Required** To checkout the project code presents in your repository
### Workflow example for Continuous Deployment
```
name: Continuous Deployment

on:
  push:
    branches:
      - main

jobs:

  build-and-deploy:
    runs-on: ubuntu-latest
    env:
      AZURE_ACCOUNT_NAME: ${{secrets.AZURE_ACCOUNT_NAME}}
      AZURE_ACCOUNT_PASSWORD: ${{secrets.AZURE_ACCOUNT_PASSWORD}}
      AZURE_SUBSCRIPTION_ID: ${{secrets.AZURE_SUBSCRIPTION_ID}}
      AZURE_TENANT_ID: ${{secrets.AZURE_TENANT_ID}}
      M365_ACCOUNT_NAME: ${{secrets.M365_ACCOUNT_NAME}}
      M365_ACCOUNT_PASSWORD: ${{secrets.M365_ACCOUNT_PASSWORD}}
      M365_TENANT_ID: ${{secrets.M365_TENANT_ID}}

    steps:
      # Provision resources.
      - uses: OfficeDev/teamsfx-cli-action@v1
        with:
          commands: provision
          subscription: ${{env.AZURE_SUBSCRIPTION_ID}}
    
      # Deploy the code.
      - uses: OfficeDev/teamsfx-cli-action@v1
        with:
          commands: deploy

      # Publish the Teams App.
      - uses: OfficeDev/teamsfx-cli-action@v1
        with:
          commands: publish
```

### Configure M365/Azure credentials as GitHub Secret:

To use any credentials, add them as [secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in the GitHub repository and then use them in the workflow.

[TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) relies on environment variables to provide login credentials for Azure and M365. The table below lists all of the environment variables.
|Name|Description|
|---|---|
|AZURE_ACCOUNT_NAME|The account name of Azure which is used to provision resources.|
|AZURE_ACCOUNT_PASSWORD|The password of Azure account.|
|AZURE_SUBSCRIPTION_ID|To identify the subscription in which the resources will be provisined.|
|AZURE_TENANT_ID|To identify the tenant in which the subscription resides.|
|M365_ACCOUNT_NAME|The M365 account for creating and publishing Teams App.|
|M365_ACCOUNT_PASSWORD|The password of M365 account.|
|M365_TENANT_ID|To identify the tenant in which the Teams App will be created/published.|

*PS:* To make these credentials work in environment variables, there should not exist any interactive part of the login process, so extra configurations should be made. These operations have risks, so be aware of that and try to make your password complicated, and the way to login by service principal in environment variables will be supported in the future.
1. The account's security defaults should be turned off, and please refer to [Disabling security defaults](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/concept-fundamentals-security-defaults#disabling-security-defaults).

In the meantime, the Azure/M365 accounts provided here should have sufficient permissions.

# Data Collection. 

The software is built based on [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/tree/main/packages/cli), TeamsFx CLI may collect information about you and your use of the software and send it to Microsoft. Microsoft may use this information to provide services and improve our products and services. You may turn off the telemetry by running `teamsfx config set telemetry off` command. There are also some features in the software that may enable you and Microsoft to collect data from users of your applications. If you use these features, you must comply with applicable law, including providing appropriate notices to users of your applications together with a copy of Microsoft’s privacy statement. Our privacy statement is located at https://go.microsoft.com/fwlink/?LinkID=824704. You can learn more about data collection and use in the help documentation and our privacy statement. Your use of the software operates as your consent to these practices.

## Reporting security issues and bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) secure@microsoft.com. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/en-us/msrc/faqs-report-an-issue?rtc=1).

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
