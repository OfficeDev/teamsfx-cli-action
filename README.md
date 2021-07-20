# GitHub Action for TeamsFx CLI


With TeamsFx CLI GitHub Action, you can automate your workflow by executing [TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) commands inside of an Action.

The definition of this GitHub Action is in [action.yml](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/action.yml).

## Sample workflow 

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
      # Checkout the code.
      - uses: actions/checkout@v2
      
      # Provision resources.
      - uses: OfficeDev/teamsfx-cli-action@v0
        with:
          commands: provision
          subscription: ${{env.AZURE_SUBSCRIPTION_ID}}
    
      # Deploy the code.
      - uses: OfficeDev/teamsfx-cli-action@v0
        with:
          commands: deploy

      # Validate the manifest.
      - uses: OfficeDev/teamsfx-cli-action@v0
        with:
          commands: validate

      # Publish the Teams App.
      - uses: OfficeDev/teamsfx-cli-action@v0
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

*PS:* To make these credentials work in environment variables, there should not exist any interactive part of the login process, so extra configurations should be made.
1. The account's two-step authentication should be turned off.
2. The account's security defaults should be turned off.

In the meantime, the Azure/M365 accounts provided here should have sufficient permissions.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
