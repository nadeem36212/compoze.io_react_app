# costdashboard

This is the a portal for costdashboard. It is deployed via the [AWS Amplify Service](https://aws.amazon.com/amplify/). 

## Deployment

The portal is deployed via pushes to the environment specific branches. A pipeline is configured within the Amplify Console for each branch. The console can be found [here](https://console.aws.amazon.com/amplify/home?region=us-east-1&code=b136b945e1b29e6ceb9d#/d93wzife5cr2s)

In order to specify environment specific variables, files have been created in the [environments](./environments) directory. There are a number of .env files, one for each branch/environment. Any environment specific variables should go in these files. Details on React environment variables can be found [here](https://create-react-app.dev/docs/adding-custom-environment-variables/)

The pipeline uses a script called **build:environment**. In order to build for a specific environment, you would run ```npm run build:environment <ENVIRONMENT_NAME>```. This will create a production optimized build for that environment

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the local development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

This script assumes the local environment, and thus will leverage the [environment/.local.env](environment/.local.env).

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build:environment <ENV>`

Builds the app for the specified environment to the `build` folder.<br />

### `npm run eject` 

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Third party access

In order to securely grant the Compoze Management platform access to your accounts, you must create and provide a third party, cross account AWS IAM Role with the appropriate access. Full AWS Documentation can be found [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html). This method is more secure than providing an access key and secret key.

In order to create an IAM Role you simply need to create an IAM Role and Policy with the appropriate [Permissions](https://aws.amazon.com/iam/features/manage-permissions/) and [Trust Relationships](https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/).

First, create an IAM Policy with permissions to access the Cost Explorer Cost and Forecast actions.

Name: **CostExplorerReadOnly** </br>
Document: 
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ce:GetCostCategories",
                "ce:GetCostAndUsageWithResources",
                "ce:GetCostAndUsage",
                "ce:GetCostForecast"
            ],
            "Resource": "*"
        }
    ]
}
```

Next, create a role named **CompozeCostExplorerAutomationRole**. Attach the **CostExplorerReadOnly** permissions policy policy.Finally, create a unique External ID and use it with the below Trust Relationships policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::939383412842:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<YOUR_EXTERNAL_ID>"
        }
      }
    }
  ]
}
``` 
939383412842 is the AWS AccountId for the Compoze Management account
