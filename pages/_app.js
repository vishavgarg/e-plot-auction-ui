import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContext } from "@/context/toast";
import { ToastContainer, toast } from "react-toastify";
export default function App({ Component, pageProps }) {
  const setToast = (msg) => toast(msg);
  return (
    <ToastContext.Provider value={{ setToast }}>
      <ToastContainer />
      <Component {...pageProps} />
    </ToastContext.Provider>
  );
}
