import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Folderview from "./pages/Folderview";
import { ModalProvider } from "./context/ModalContext/ModalContext";
import { ViewProvider } from "./context/ViewContext/ViewContext";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ViewProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Folderview />} />
              <Route path="/folder/:id" element={<Folderview />} />
            </Routes>
          </BrowserRouter>
        </ViewProvider>
      </ModalProvider>
    </QueryClientProvider>
  </>
);
