
# Friend Search and Recommendation App

A full-stack MERN application that allows users to search for friends, send friend requests, accept/reject requests, unfriend users, and get friend recommendations based on mutual connections.

## Features

## User Authentication
- **Sign Up** – Register with name, email, and password.
- **Login** – Secure user authentication with JWT.
- **Logout** – End user session securely.


## Home Page
- Displays searchable users list.
- Shows the friend list with the option to unfriend.

## Friend Management
- **Send Friend Requests** – Request to connect with other users.
- **Accept/Reject Requests** – Manage incoming friend requests.
- **Unfriend Users** – Remove friends from your friend list.

## Friend Recommendations
- Suggests friends based on mutual connections.
- Displays recommendations on the dashboard.
## Tech Stack

**Frontend(React)**
- React.js, Redux (State Management)
- TailwindCSS (Styling)
- React Router (Navigation)
- React Toastify (Notifications)


**Backend(Nodejs & Expressjs)**
- Express.js (API Framework)
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- JWT (Authentication)


## Installation

1. Clone the repository

```bash
 git clone https://github.com/animesh156/findmyfriend.git
cd findmyfriend
```


2. Setup Backend

```bash
cd server
npm install

```

- Create a .env file in the backend directory and add
 ```bash
 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- Start the backend server
 ```bash
 npm run server
```


3. Setup Frontend

```bash
cd client
npm install

```

- Start the frontend server:
 ```bash
 npm run dev
```
## API EndPoints

### Authencation


| Method    | Endpoint | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login` | Login a User |

###  User & Friends



| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `GET`      | `friends/users/:id` | Get all users except friends & pending requests |
| `POST`      | `friends/sendRequest` | Sent a friend request |
| `PUT`      | `friends/acceptRequest` | Accept a friend request |
| `DELETE`      | `friends/remove/:friendId` | Remve  friend |
| `GET`      | `friends/recommendations/:id` | Get recommended friends |




## License

[MIT](https://choosealicense.com/licenses/mit/)

