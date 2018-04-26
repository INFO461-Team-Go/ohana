# o’hana Architecture Specifications
Prepared By Team Go

Version 0.1

* * *


**Webapp**

Node Packages

* Firebase

    * URL:  [https://firebase.google.com/docs/reference/js/](https://firebase.google.com/docs/reference/js/)

    * Version: 5.12.0

    * Purpose: We will be using Firebase to store user data about tasks and also for user authentication for the webapp. Firebase offers a greater ease at retrieving information from the database by returning DataSnapshots. These data snapshots can be converted into JSON objects for further inspection. In addition, we decided to go with Firebase over other services such as Heroku because of Firebase’s email / password authentication api. 

* React:

    * URL:  [https://reactjs.org/](https://reactjs.org/)

    * Version: 16.3.2

    * Purpose: React offers reusable components. This allows for a consistent style and efficiency. Components can be easily modified and can be reused in multiple pages.

* React-DOM

    * URL: [https://getbootstrap.com/](https://getbootstrap.com/)

    * Version: v4.1.0

    * Purpose: Connects React with the DOM.

* React-Router-DOM

    * URL: [https://getbootstrap.com/](https://getbootstrap.com/)

    * Version: v4.1.0

    * Purpose: Navigation component in React that allows users to navigate different sections of the web app.

* Bootstrap

    * URL: [https://getbootstrap.com/](https://getbootstrap.com/)

    * Version: v4.1.0

    * Purpose: Bootstrap offers a solid framework for us to build and style the page while simultaneously providing sufficient flexibility for us to include custom CSS components. We will be using Bootstrap CDN to avoid conflicts with React. In addition to the bootstrap styles, we will be developing our own CSS style library to customize the look and feel of the webapp.

## Signin View Component
A React JS component to render the UI for the sign in view of the app. The class includes Firebase functionality to authenticate users and navigate them to the right page.
<table>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>constructor()</td>
    <td>props</td>
    <td>-</td>
    <td>Creates a state object initializing user email and password</td>
  </tr>
  <tr>
    <td>componentDidMount()</td>
    <td>-</td>
    <td>-</td>
    <td>Creates an observer to listen for firebase state changes. If there is a firebase state change and user is truthy, routes app to view component</td>
  </tr>
  <tr>
    <td>componentWillUnmount()</td>
    <td>-</td>
    <td>-</td>
    <td>Removes the observer for changes to the user's sign-in state when app is routed away from sign in screen</td>
  </tr>
  <tr>
    <td>render()</td>
    <td>-</td>
    <td>HTML element with user input forms for signing in</td>
    <td>Creates and renders sign in form</td>
  </tr>
  <tr>
    <td>handleSubmit()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Calls firebase signin with email and password based on state</td>
  </tr>
</table>


Connectors

Once the user is authenticated in the sign in view, they are navigated to the tasks tab. So, so the user object is one of the props that is passed on to the tasks view.

<table>
  <tr>
    <td>Signup View Component
A React JS component to render the UI for the sign up view of the app. The class includes Firebase functionality to create a user in with the given email and password in our database.</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>constructor()</td>
    <td>props</td>
    <td>-</td>
    <td>Creates a state object initializing device ID, roommates, chores, counts, user IDs, and lists to be empty to begin with.</td>
  </tr>
  <tr>
    <td>handleChange()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Updates the state object (initialized in constructor) upon given event.</td>
  </tr>
  <tr>
    <td>handleSignUp()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Calls the signUp callback within App.js passing it the items within the state object</td>
  </tr>
  <tr>
    <td>render()</td>
    <td>-</td>
    <td>HTML element with user input form with fields for email address, password, and display name.</td>
    <td>Creates and renders multiple forms with validity checking for user sign up (Forms according to website sign up page mockup)</td>
  </tr>
</table>


Connectors

Once the user is profile is created in the database, they are navigated to the roommates tab. The user object is passed on as one of the props and it will be used as the first element in the roommates list.

<table>
  <tr>
    <td>Roommates Component
A React JS component to render the UI for one of the two main tabs in the webapp. The class includes functionality to read user data snapshots from Firebase database and renders it accordingly. The UI also allows for the user to add and remove roommates.</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>constructor()</td>
    <td>props</td>
    <td>-</td>
    <td>Creates a state object with a fields for a list of roommates</td>
  </tr>
  <tr>
    <td>componentDidMount()</td>
    <td>-</td>
    <td>-</td>
    <td>Initialize the fields in the state with the data snapshots retrieved from Firebase when ever the page is reloaded</td>
  </tr>
  <tr>
    <td>componentWillUnmount()</td>
    <td>-</td>
    <td>-</td>
    <td>Stop listening for new data snapshots from Firebase.</td>
  </tr>
  <tr>
    <td>componentWillReceiveProps()</td>
    <td>nextProps</td>
    <td>-</td>
    <td>Used to pass in a new set of properties to the component. In this case, it’s the new tab name. </td>
  </tr>
  <tr>
    <td>storeName()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Inserts the new name from the user into the firebase database</td>
  </tr>
  <tr>
    <td>editName()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Over-writes an existing roommate’s name in the firebase database</td>
  </tr>
  <tr>
    <td>deleteName()</td>
    <td>JS event</td>
    <td>-</td>
    <td>Removes the given name from the firebase database</td>
  </tr>
  <tr>
    <td>render()</td>
    <td>-</td>
    <td>An HTML element which consists of a list of users</td>
    <td>Displays a list of roommates and also provides the option to add and remove users from the list.</td>
  </tr>
</table>


<table>
  <tr>
    <td>Tasks Component
A React JS component to render the UI for one of the two main tabs in the webapp. The class includes functionality to read assignment data snapshots from Firebase database and renders it. The UI also allows for the user to re-assign the tasks among roommates.</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>constructor()</td>
    <td>props</td>
    <td>-</td>
    <td>Creates a state object with a fields for a list of tasks</td>
  </tr>
  <tr>
    <td>componentDidMount()</td>
    <td>-</td>
    <td>-</td>
    <td>Initialize the fields in the state with the data snapshots retrieved from Firebase whenever the page is reloaded</td>
  </tr>
  <tr>
    <td>componentWillUnmount()</td>
    <td>-</td>
    <td>-</td>
    <td>Stop listening for new data snapshots from Firebase.</td>
  </tr>
  <tr>
    <td>componentWillReceiveProps()</td>
    <td>nextProps</td>
    <td>-</td>
    <td>Used to pass in a new set of properties to the component. In this case, it’s the new tab name. </td>
  </tr>
  <tr>
    <td>storeTask()</td>
    <td>-</td>
    <td>-</td>
    <td>Stores task to the firebase database</td>
  </tr>
  <tr>
    <td>editTask()</td>
    <td>-</td>
    <td>-</td>
    <td>Allows the user to edit the roommate assigned to the task.</td>
  </tr>
  <tr>
    <td>deleteTask()</td>
    <td>-</td>
    <td>-</td>
    <td>Removes task from the firebase database</td>
  </tr>
  <tr>
    <td>render()</td>
    <td>-</td>
    <td>An HTML element which consists of a list of tasks</td>
    <td>Displays a list of tasks and also provides the option to add and remove tasks from the list.</td>
  </tr>
</table>


**Firebase Database Structure**

We have modularized the architecture of the web app and the alexa skill based on the database structure illustrated in the following diagram.

![image alt text](image_0.png)

**Alexa Skill**

Node Packages

* Alexa-app

    * URL: [https://www.npmjs.com/package/alexa-app](https://www.npmjs.com/package/alexa-app)

    * Version: 4.2.2

    * Purpose: A module to simplify the creation of Amazon echo skills.

* Firebase

    * URL:  [https://firebase.google.com/docs/reference/js/](https://firebase.google.com/docs/reference/js/)

    * Version: 5.12.0

    * Purpose: We will be using Firebase to store user data about tasks and also for user authentication for the webapp. Firebase offers a greater ease at retrieving information from the database by returning DataSnapshots. These data snapshots can be converted into JSON objects for further inspection. In addition, we decided to go with Firebase over other services such as Heroku because of Firebase’s email / password authentication api.

<table>
  <tr>
    <td>DBConn
A node module to interact with Firebase by reading and/or updating roommate and task related data on the Firebase database.</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>getAssignments()</td>
    <td>string</td>
    <td>string</td>
    <td>Queries the Firebase database for all the tasks associated with that device id. Filters the task with the person’s name (input string) and returns it.</td>
  </tr>
  <tr>
    <td>updateAssignments()</td>
    <td>-</td>
    <td>-</td>
    <td>Takes the updated list and over writes Firebase database’s assignments data snap shot</td>
  </tr>
</table>


<table>
  <tr>
    <td>Ohana</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Parameters</td>
    <td>Returns</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>markAsDone()</td>
    <td>string</td>
    <td>-</td>
    <td>Extracts the roommate’s name from the voice command. Queries the Firebase database with the person’s name and updates to the person’s next task.</td>
  </tr>
  <tr>
    <td>getTasks()</td>
    <td>string</td>
    <td>-</td>
    <td>Extracts the roommate’s name from the voice command. Query Firebase database with person’s name and read the task assigned to </td>
  </tr>
</table>
