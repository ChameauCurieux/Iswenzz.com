import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import * as serviceWorker from "serviceWorker";
import ReactDOM from "react-dom";
import application from "application";
import "i18n";

ReactDOM.render(application, document.getElementById("iswenzz-react-root"));
serviceWorker.unregister();