# Todo List App
A simple todo list app written in React Native (TypeScript).

Here's a video demo: https://youtu.be/pR5UTVapN4w

## Step 0: Create secrets.json file

You will need to create a `secrets.json` file containing two endpoints where `listsURL` is the endpoint for the todo list objects and `itemsURL` is the endpoint for the todo item objects.

```json
{
    "listsURL": "https://lists-example.com",
    "itemsURL": "https://items-example.com"
}
```

These endpoints are used throughout the project to query data from the server.

## Step 1: Start the Metro Server

Start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

```bash
npm start
```

## Step 2: Start your Application

In the same running terminal, select the appropriate device type (Android or iOS).

```bash
# for Android
a

# for iOS
i
```

## Future Improvements
- Use React Context to store global state to prevent need to fetch data on every page navigation
- Offline access and reconciliation
- More fluid loading behaviour