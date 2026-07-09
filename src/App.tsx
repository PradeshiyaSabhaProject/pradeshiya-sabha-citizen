import "./index.css";
import Layout from "./components/Layout/Layout";
import AppRoutes from "./router/AppRoutes";

function App(): React.ReactElement {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;