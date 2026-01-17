import { Switch, Route, Redirect } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { AdminLayout } from "./components/AdminLayout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Network from "./pages/Network";
import Impact from "./pages/Impact";
import Funding from "./pages/Funding";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminBlog from "./pages/admin/Blog";
import AdminMessages from "./pages/admin/Messages";

function Router() {
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdminAuth(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    setIsAdminAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminAuth(false);
    window.location.href = '/admin/login';
  };

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">
        {() => (
          <>
            <Navigation />
            <Home />
            <Footer />
          </>
        )}
      </Route>
      
      <Route path="/about">
        {() => (
          <>
            <Navigation />
            <About />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/portfolio">
        {() => (
          <>
            <Navigation />
            <Portfolio />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/network">
        {() => (
          <>
            <Navigation />
            <Network />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/impact">
        {() => (
          <>
            <Navigation />
            <Impact />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/funding">
        {() => (
          <>
            <Navigation />
            <Funding />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/news/:slug?">
        {() => (
          <>
            <Navigation />
            <News />
            <Footer />
          </>
        )}
      </Route>

      <Route path="/contact">
        {() => (
          <>
            <Navigation />
            <Contact />
            <Footer />
          </>
        )}
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login">
        {() => isAdminAuth ? <Redirect to="/admin" /> : <AdminLogin onLogin={handleLogin} />}
      </Route>

      <Route path="/admin">
        {() => !isAdminAuth ? <Redirect to="/admin/login" /> : <Redirect to="/admin/dashboard" />}
      </Route>

      <Route path="/admin/:rest*">
        {() => {
          if (!isAdminAuth) {
            return <Redirect to="/admin/login" />;
          }
          return (
            <AdminLayout onLogout={handleLogout}>
              <Switch>
                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/admin/projects" component={AdminProjects} />
                <Route path="/admin/blog" component={AdminBlog} />
                <Route path="/admin/messages" component={AdminMessages} />
                <Route path="/admin/wruas" component={AdminDashboard} />
                <Route path="/admin/funding" component={AdminDashboard} />
                <Route path="/admin/subscribers" component={AdminDashboard} />
                <Route path="/admin/settings" component={AdminDashboard} />
                <Route component={AdminDashboard} />
              </Switch>
            </AdminLayout>
          );
        }}
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
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
