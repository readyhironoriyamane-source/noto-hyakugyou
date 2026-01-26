import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import IndustryDetailPage from "./pages/IndustryDetailPage";
import SupportArchivePage from "./pages/SupportArchivePage";
import SupportDetailPage from "./pages/SupportDetailPage";

import PrivacyPage from "./pages/PrivacyPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      <Route path={"/privacy"} component={PrivacyPage} />
      <Route path={"/contact"} component={ContactPage} />
      <Route path={"/industry/:id"} component={IndustryDetailPage} />
      <Route path={"/supports"} component={SupportArchivePage} />
      <Route path={"/support/:id"} component={SupportDetailPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
