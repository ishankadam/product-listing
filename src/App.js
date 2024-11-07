import "./css/styles.scss";
import "./App.css";
import CustomAppbar from "./components/appbar/appbar";
import ProductListing from "./pages/products/productListing";

function App() {
  return (
    <div className="App">
      <CustomAppbar></CustomAppbar>
      <ProductListing></ProductListing>
    </div>
  );
}

export default App;
