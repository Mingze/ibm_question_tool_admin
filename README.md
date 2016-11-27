# IBM Watson Question Collection Tool Administration(WATSON QCT Admin)

This tool is used by GBS France and Watson France groupe to administrate and download the customer questions collected. This tool is initially used by IBM Watson Lab Services to help collect questions for Watson Engagement Advisor (WEA).

The tool is developped on Node.js to provide a simple UI for users to enter questions which are stored in a database Cloudant. You can either run it in local or deploy it on IBM Bluemix.

- [Fonctionnalities](#Fonctionnalities)
- [Screenshots](#Screenshots)
- [Initial Setup](#initial-setup)
  - [Cloudant Setup](#cloudant-setup)
  - [Bluemix Setup](#bluemix-setup)
- [QCT Tool Access](#QCT-tool-access)
- [Customizations](#customizations)



## Fonctionnalities:
- Dashboard for the questions collected
- Filter on the different information fields defined. 
- Download the whole database

## Screenshots:

### Page login:
![Graph](screenshot/1.png "Graph")

### Main Page, all questions are shown in this page, here you can add some information and the objectifs:
![Graph](screenshot/2.png "Graph")


## Prerequisites

1. Create an IBM Cloudant account [https://cloudant.com](https://cloudant.com)
     - Cloudant will act as the database for the QCT tool
2. Create an IBM Bluemix account [https://console.ng.bluemix.net](https://console.ng.bluemix.net)
     - Bluemix is where the app will be hosted
3. Download QCT source code .zip archive
     - Save the source code to a local directory
4. Download Node.js


## Initial Setup

### Cloudant Setup

1. Login to Cloudant with the account that you created
2. Create a "configuration" DB in Cloudant
  - Go to the Databases tab
  - Click on "Add New Database"
  - Create a database called "configuration"
3. Create a "questions" DB in Cloudant
  - Go to the Databases tab
  - Click on "Add New Database"
  - Create a database called "questions"
4. Create an API Key for the "configuration" DB
  - Go to the Databases tab
  - Click on the "configuration" DB
  - Click on "Permissions"
  - Click on "Generate API key"
  - Record the Key and Password, they will not be displayed again
  - In the permissions table make sure the API key has "Reader" and "Writer" permissions
5. Create an API Key for the "questions" DB
  - Go to the Databases tab
  - Click on the "questions" DB
  - Click on "Permissions"
  - Click on "Generate API key"
  - Record the Key and Password, they will not be displayed again
  - In the permissions table make sure the API key has "Reader" and "Writer" permissions
6. Create a new document in the "configuration" DB document to represent the customer and copy the contents of "customer1.json"
  - Go to the Databases tab
  - Click on the "configuration" DB
  - Under the "All Documents" menu click the "+"
  - Select "New Doc" from the menu that is displayed
  - Replace the contents of the New Document with the sample "customer1.json"
  - The sample "customer1.json" can be found from the QCT source code in the directory <QCT>/lib/db/
  - Save the document
7. Update the customer doc in the "configuration" DB
  - Contiue modifying the new customer doc created in step #6
  - Update the "_id" and "name" fields to match the customer you're working with
  - Update the "questions_db" properties with the Cloudant account hostname and API key info created from step #5
  - Update the "users" property to specify the admin user accounts
  - Save the changes to the document
  - Click "Cancel" to exit the document edit view
8. Create database index for the "questions" DB
  - Go to the Databases tab
  - Click on the "questions" DB
  - Under the "All Design Docs" menu click the "+"
  - Select "New Doc" from the menu that is displayed
  - Replace the contents of the New Document with the sample code from "questions_index.json"
  - The sample "questions_index.json" can be found from the QCT source code in the directory <QCT>/lib/db/
  - Save the document
  

### Bluemix Setup

1. Login to Bluemix with the account that you created
2. Create a new app
  - Go to the "Dashboard" tab
  - Click on "Create App" under the "Cloudant Foundry Apps"
  - For the "What kind of app are you creating?" question choose "Web"
  - For the "How do you want to get started? question choose ".js SDK for Node.js" and click "Continue"
  - For the "What do you want to name your new app?" question enter a name and click "Finish"
  - You will be taken to a screen with the question "How do you want to start coding?"
  - In the background Bluemix will start the default app
3. Add GIT for your app
  - Click the "Overview" link from the left menu
  - Click "Add GIT" at the top right which will open a "Create GIT Repository" dialog
  - Check the option "Populate the repo with the starter app package" and click "Continue"
  - Click "Close" when after the repository is created
4. Setup the Environment Variables for the app
  - Click the "Environment Variables" from the left menu
  - Click on "User-Defined"
  - Click "Add" to create a new variable
  - Enter "CLOUDANT_R" for the name
  - Enter this connection string for the value {"cloudant":{"db":"configuration","username":"apikey","password":"password","host":"account.cloudant.com"}}
  - Replace the "username", "password" and "host" values with the api key and password along with your Cloudant account
  - Click "Add" again to create another new variable
  - Enter "CUSTOMER" for the name
  - Enter the customer ID that you specified in step #7 in the Cloudant Setup section
  - Click "Save" and the app will automatically be restarted
5. Import the QCT application source code to this app
  - Click the "Overview" link from the left menu
  - Click the "Edit Code" at the top right which will open a new browser tab to Bluemix DevOps Services
  - In the list of files for your app, delete the "index.html" under the "public" directory
  - Click back on the root directory for the app
  - Under the "File" menu select "Import > File or Zip Archive"
  - Choose the QCT source code .zip archive that you downloaded and click "OK" when prompted to unzip the archive
  - When the "Failed to transfer..." appears click "OK" to force the files to be overwritten
  - You should see the list of files updated with the contents of the QCT source code .zip archive
6. Sync the QCT source files with the master repository
  - Click the "GIT Repository" icon from the left menu
  - In the "Working Directory Changes" section click the "Select All" option to commit all the new files
  - In the "Enter the commit message" text area type in some comments like "Adding initial version of QCT tool"
  - Click "Commit" at the top right
  - In the "Active Branch" section click "Push" to deliver all the changes to the master repository
7. Build and Deploy the application
  - Click on the "Build and Deploy" at the top right
  - After the commit, Bluemix will automatically try to build and deploy all the new changes
  - You can follow the progress by viewing the two pipeline stages "Build Stage" and "Deploy Stage"
  - When the "Deploy Stage" shows "Deploy to dev succeeded" the app is available for access 


## Customizations
You can make serveral changes in the "configuration database" that you defined in Cloudant:

### Change the text shown:
Change it on the home page: `./views/admin.hbs`. There are 3 sections in this application with ids: intro, one, two. You can change any texts/icons/images you want.

### Change the cookie expiration
Update the "cookie_expiration" property to the desired value, the time unit is in days
### Change the questions goal
Update the "questions_goal" property to the desired value, by defaut the value is 2000.