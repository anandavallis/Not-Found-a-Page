document.addEventListener('DOMContentLoaded', () => {
    // Store the original path to handle incorrect routes
    const originalPath = window.location.pathname;
    
    // List of valid paths (you would normally get these from your backend)
    const validPaths = ['/', '/about', '/contact', '/products'];
    
    // Function to show 404 page
    function show404() {
        // Update page title
        document.title = '404 Page Not Found | MyApp';
        
        // In a real SPA, you would render the 404 view here
        console.log(`Rendering 404 for path: ${originalPath}`);
    }
    
    // Check if the current path is valid
    if (!validPaths.includes(originalPath)) {
        // Check if this is a backend 404 (server would handle this in production)
        if (!originalPath.startsWith('/api')) {
            show404();
        }
    }
    
    // Handle link clicks for SPA navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only intercept internal links
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault();
                
                // In a real SPA, you would update the view here
                if (validPaths.includes(href)) {
                    console.log(`Navigating to: ${href}`);
                    window.history.pushState({}, '', href);
                    // You would update the page content here
                    document.title = `${href === '/' ? 'Home' : href.charAt(1).toUpperCase() + href.slice(2)} | MyApp`;
                } else {
                    console.log(`Invalid route: ${href}`);
                    window.history.pushState({}, '', href);
                    show404();
                }
            }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        if (!validPaths.includes(path)) {
            show404();
        }
    });
});
