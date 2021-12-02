# GitHub Action for TeamsFx CLI


The TeamsFx CLI GitHub Action is an integration of [TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) commands, which helps Teams app developers to automate their CI/CD workflow.

More definition of Teams CLI GitHub Action is here in [action.yml](https://github.com/OfficeDev/teamsfx-cli-action/blob/main/action.yml).

## Sample workflow 

### Dependencies on the project
Please make sure the project uses [TeamsFx CLI](https://www.npmjs.com/package/@microsoft/teamsfx-cli) as its dev dependency in the root `package.json` like below:

`
  "devDependencies": {
    "@microsoft/teamsfx-cli": "^0.8.0"
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
      AZURE_SUBSCRIPTION_ID: ${{secrets.AZURE_SUBSCRIPTION_ID}}

      # To specify the env name for multi-env feature.
      TEAMSFX_ENV_NAME: staging
    steps:

      # Login Azure by service principal 
      - uses: OfficeDev/teamsfx-cli-action@v1
        with:
          commands: account login azure 
          service-principal: true
          username: ${{secrets.AZURE_SERVICE_PRINCIPAL_NAME}}
          password: ${{secrets.AZURE_SERVICE_PRINCIPAL_PASSWORD}}
          tenant: ${{secrets.AZURE_TENANT_ID}}
 
      # Provision resources.
      - uses: OfficeDev/teamsfx-cli-action@v1
        env:
          TEAMSFX_BICEP_ENV_CHECKER_ENABLE: true
        with:
          commands: provision
          subscription: ${{env.AZURE_SUBSCRIPTION_ID}}
          env: ${{env.TEAMSFX_ENV_NAME}}
    
      # Deploy the code.
      - uses: OfficeDev/teamsfx-cli-action@v1
        with:
          commands: deploy
          env: ${{env.TEAMSFX_ENV_NAME}}
```

### Configure credentials as GitHub Secret:

To use any credentials, add them as [secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in the GitHub repository and then use them in the workflow.

The table below lists all of the credentials required to login Azure by service principal. 
|Name|Description|
|---|---|
|AZURE_SERVICE_PRINCIPAL_NAME|The service principal name of Azure used to provision resources.|
|AZURE_SERVICE_PRINCIPAL_PASSWORD|The password of Azure service principal.|
|AZURE_SUBSCRIPTION_ID|To identify the subscription in which the resources will be provisioned.|
|AZURE_TENANT_ID|To identify the tenant in which the subscription resides.|

To create Azure service principals for use, refer to [here](#how-to-create-azure-service-principals-for-use).

# How to create Azure service principals for use?
To provision and deploy resources targeting Azure inside CI/CD, you must create an Azure service principal for use.

Briefly, the steps include:
1. Register an Azure AD application in single tenant, and it requires sufficient permissions in your Azure AD tenant.
2. Assign a role to your Azure AD application to access your Azure subscription, and `Contributor` role is recommended. 
3. Create a new Azure AD application secret.
4. Grab your tenant id, application id(AZURE_SERVICE_PRINCIPAL_NAME), and the secret(AZURE_SERVICE_PRINCIPAL_PASSWORD) for use.

For detailed guidelines, refer to [the official document](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal). There're three ways to create service principal, [Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal), [PowerShell](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-authenticate-service-principal-powershell), [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli), and you can choose the way you like.

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
