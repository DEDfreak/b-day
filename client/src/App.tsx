import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import Home from "@/pages/home";
import MemoryPage from "@/pages/MemoryPage";
import AuthPage from "@/pages/AuthPage";
import BackgroundMusic from "@/components/BackgroundMusic";
// import BirthdayPreview from "@/pages/BirthdayPreview";

function Router() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem("site_unlocked") === "true";
  });

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem("site_unlocked", "true");
  };

  const handleLock = () => {
    setUnlocked(false);
    localStorage.removeItem("site_unlocked");
  };

  return (
    <Switch>
      <Route path="/preview">
        {() => {
          // Special preview route that bypasses auth and countdown
          return (
            <>
              <BackgroundMusic />
              <Home isPreview={true} />
            </>
          );
        }}
      </Route>

      <Route path="/secret">
        <AuthPage onUnlock={handleUnlock} />
      </Route>

      {!unlocked ? (
        <Route>
          <AuthPage onUnlock={handleUnlock} />
        </Route>
      ) : (
        <>
          <BackgroundMusic />
          <Route path="/">{() => <Home onLock={handleLock} />}</Route>
          <Route path="/memory/:id">
            {(params) => <MemoryPage id={params.id} onLock={handleLock} />}
          </Route>
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;