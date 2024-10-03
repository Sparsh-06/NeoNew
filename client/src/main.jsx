import {createRoot} from "react-dom/client";
import {ReactLenis} from "lenis/react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import DashLayout from "./DashLayout/Layout.jsx";
import {ApplicationTracker} from "./pages/ApplicationTracker.jsx";
import {SOPWriter} from "./pages/SOPWriter.jsx";
import {CommunitySpace} from "./pages/CommunitySpace.jsx";
import {DocumentManagerPage} from "./pages/DocumentPage.jsx";
import {Auth0Provider} from "@auth0/auth0-react";
import Alumni from "./pages/Alumni.jsx";
import Pricing from "./components/Pricing.jsx";
import PricingWeb3 from "./pages/Pricing.jsx";
import Practice from "./pages/Practice.jsx";
import { EssayWriting } from "./pages/Essay.jsx";


createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain="dev-3ecuhq0fp4p77k6d.us.auth0.com"
        clientId="cUr8E99TzQ2rf7p4WbY25IsvA2vRZhOF"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <Router>
            <ReactLenis root>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/dashboard" element={<DashLayout/>}>
                        <Route path="community-space" element={<CommunitySpace/>}/>
                        <Route path="pricing" element={<PricingWeb3/>}/>
                        <Route path="mock" element={<Practice/>}/>
                        <Route path="essay" element={<EssayWriting/>}/>

                        <Route path="application-tracker" element={<ApplicationTracker/>}/>
                        <Route path="alumni" element={<Alumni/>}/>
                        <Route path="Statement-Writer" element={<SOPWriter/>}/>
                        <Route path="document-manager" element={<DocumentManagerPage/>}/>
                        <Route index element={<DocumentManagerPage/>}/>
                        <Route path="community-space" element={<CommunitySpace/>}/>
                    </Route>
                </Routes>
            </ReactLenis>
        </Router>
    </Auth0Provider>
);
  