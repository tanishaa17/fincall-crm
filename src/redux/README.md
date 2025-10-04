# Redux & Auth Setup

## Folder Structure

```
src/redux/
  store.js         # Redux store setup
  Provider.jsx     # Redux Provider for app
  api/
    authApi.js     # Auth API logic (login, logout, token mgmt)
  slices/
    authSlice.js   # Auth slice for admin/employee login/logout
```

## Usage

- Use `adminLoginThunk` and `employeeLoginThunk` for login actions.
- Use `logoutThunk` for logout.
- Auth API handles token automatically.
- Import and use ReduxProvider in your layout for global state.

## Best Practices

- API logic is separated from UI and Redux logic.
- Token is managed centrally, not passed manually in UI.
- Add more slices in `slices/` as needed for other features.
