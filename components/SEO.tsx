import React, { useEffect } from 'react';
import { useSiteSettings } from '../hooks/useSupabaseData';

const SEO: React.FC = () => {
    const settings = useSiteSettings();

    useEffect(() => {
        if (settings.site_title) {
            document.title = settings.site_title;
        }

        const updateMeta = (name: string, content: string, isProperty = false) => {
            let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                if (isProperty) {
                    element.setAttribute('property', name);
                } else {
                    element.setAttribute('name', name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        if (settings.meta_description) updateMeta('description', settings.meta_description);
        if (settings.meta_keywords) updateMeta('keywords', settings.meta_keywords);
        if (settings.og_title) updateMeta('og:title', settings.og_title, true);
        if (settings.og_description) updateMeta('og:description', settings.meta_description || '', true);

    }, [settings]);

    return null; // This component doesn't render anything
};

export default SEO;
