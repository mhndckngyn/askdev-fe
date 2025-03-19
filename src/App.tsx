import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <Router>
      <MantineProvider>
        <div className={styles.app}>
          <NavBar />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}
