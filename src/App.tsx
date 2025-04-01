import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import NotFound from "./layouts/NotFound";
import AccountSuspended from "./layouts/AccountSuspended";
import TagsPage from "./pages/TagsPage";
import PostQuestion from "./pages/PostQuestion";
import ErrorModal from "./components/ErrorModal";

export default function App() {
  return (
    <Router>
      <MantineProvider>
        <div className={styles.app}>
          <NavBar />
          <div className={styles.content}>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />

              <Route path="/" element={<Homepage />} />
              <Route path="/tags" element={<TagsPage />} />

              <Route path="/questions/post" element={<PostQuestion />} />

              <Route path="/suspended" element={<AccountSuspended />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <ErrorModal />
        </div>
      </MantineProvider>
    </Router>
  );
}
