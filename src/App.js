import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./components/Login";
import Register from "./components/Register";

const DOMAIN = "dev-yjoayq6jizu04vpi.us.auth0.com";
const CLIENT_ID = "fL5D5isi5lrrwNgojkhJ8lBZ4XcsNIAj";

function App() {
  return (
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;