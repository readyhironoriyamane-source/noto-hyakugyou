import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import IndustryDetailPage from "./pages/IndustryDetailPage";
import SupportArchivePage from "./pages/SupportArchivePage";
import SupportDetailPage from "./pages/SupportDetailPage";

import PrivacyPage from "./pages/PrivacyPage";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path={"/"}>
          <PageTransition>
            <Home />
          </PageTransition>
        </Route>

        <Route path={"/privacy"}>
          <PageTransition>
            <PrivacyPage />
          </PageTransition>
        </Route>

        <Route path={"/contact"}>
          <PageTransition>
            <ContactPage />
          </PageTransition>
        </Route>

        <Route path={"/industry/:id"}>
          {(params) => (
            <PageTransition>
              <IndustryDetailPage params={params} />
            </PageTransition>
          )}
        </Route>

        <Route path={"/supports"}>
          <PageTransition>
            <SupportArchivePage />
          </PageTransition>
        </Route>

        <Route path={"/support/:id"}>
          {(params) => (
            <PageTransition>
              <SupportDetailPage params={params} />
            </PageTransition>
          )}
        </Route>

        <Route path={"/404"}>
          <PageTransition>
            <NotFound />
          </PageTransition>
        </Route>

        {/* Final fallback route */}
        <Route>
          <PageTransition>
            <NotFound />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
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
