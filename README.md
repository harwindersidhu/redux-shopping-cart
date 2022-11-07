# Redux-Shopping-Cart
Redux is a predictable state container for JavaScript apps. It centralizes the application's state and logic. This app has the following functionalities:
- User authentication
- Add and remove items from the cart
- Fetch data from firebase database
- Post data to firebase database
- Show notifications using material UI. 

In this application, the authentication state, cart state and notification state are managed by using redux. 

We should not perform HTTP asynchronous requests in reducers. In this app, we did this functionality in two ways.
- In our first approach, we did perform asynchronous requests by using useEffect in components.
- In our second approach, we use the `Redux Thunk` pattern. 

# Dependencies
- React
- Node.js
- Redux
- Firebase
- Material UI
- Javascript

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

