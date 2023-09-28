# talky-rest-api
 A rest api for a simple blog

Build a Blog API that can be used to manage posts and comments as well as go through the registration and logging user process using a JWT token

## Tech Stack

**Server:** Node, Express, MySql, Sequelize, JWT

# API FEATURES

- ✅ Authentication using JSON Web tokens (JWT) & Authorization
- ✅ Post CRUD operations
- ✅ Category CRUD operations
- ✅ Comment functionality
- ✅ Profile photo uploaded
- ✅ Update password
- ✅ System blocking user if inactive for 30 days
- ✅ Admin can block a user
- ✅ A user can block different users
- ✅ A user who block another user cannot see his/her posts
- ✅ Check if a user is active or not
- ✅ Check last date a user was active
- ✅ Changing user award base on number of posts created by the user
- ✅ A user can follow and unfollow another user
- ✅ Get all users who views someone's profile
- ✅ Admin can unblock a blocked user
- ✅ A user can close his/her account


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```