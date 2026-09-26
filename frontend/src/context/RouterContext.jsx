import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) return hash;
    const path = window.location.pathname;
    if (path && path !== '/') return path;
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to) => {
    const target = to.startsWith('/') ? to : '/' + to;
    if (target === currentPath) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    window.history.pushState(null, '', '#' + target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({ to, children, className, onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  const href = '#' + (to.startsWith('/') ? to : '/' + to);

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
