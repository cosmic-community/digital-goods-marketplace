(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(function(arg) {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, function(key, value) {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }
  
  console.log = function() {
    originalConsole.log.apply(console, arguments);
    captureLog('log', Array.from(arguments));
  };
  
  console.warn = function() {
    originalConsole.warn.apply(console, arguments);
    captureLog('warn', Array.from(arguments));
  };
  
  console.error = function() {
    originalConsole.error.apply(console, arguments);
    captureLog('error', Array.from(arguments));
  };
  
  console.info = function() {
    originalConsole.info.apply(console, arguments);
    captureLog('info', Array.from(arguments));
  };
  
  console.debug = function() {
    originalConsole.debug.apply(console, arguments);
    captureLog('debug', Array.from(arguments));
  };
  
  window.addEventListener('error', function(event) {
    captureLog('error', ['Unhandled error:', event.message, 'at', event.filename + ':' + event.lineno]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled promise rejection:', String(event.reason)]);
  });
  
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  var originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    sendRouteChange();
  };
  
  var originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }
})();