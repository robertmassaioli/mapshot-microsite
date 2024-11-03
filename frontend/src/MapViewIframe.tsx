import React, { useEffect, useRef, useState } from "react";
import { MapshotMapData } from "./mapshot";
import { toMapLocation } from "./util";

export type MapViewFrameProps = {
   saveDir: string;
   mapshot: MapshotMapData;
};

function appendRelativeUrl(relativeUrl: string): string {
   // Get the base domain from window.location
   const baseDomain = `${window.location.protocol}//${window.location.host}`;

   // Ensure the relative URL starts with a forward slash
   const normalizedRelativeUrl = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;

   // Combine the base domain and the relative URL
   return `${baseDomain}${normalizedRelativeUrl}`;
 }

export const MapViewFrame: React.FC<MapViewFrameProps> = ({saveDir, mapshot}) => {
   const [iframeSrc, setIframeSrc] = useState(appendRelativeUrl(toMapLocation(saveDir, mapshot.unique_id)));
   const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updateIframeSrc = () => {
      let currentUrl;

      const current = iframeRef.current;
      if (current && current.contentWindow && current.contentWindow.location.href !== 'about:blank') {
        // Use the current iframe URL if it's available and not the initial about:blank
        currentUrl = new URL(current.contentWindow.location.href);
      } else {
        // Otherwise, use the baseUrl
        const generatedLocation = appendRelativeUrl(toMapLocation(saveDir, mapshot.unique_id));

        console.log('generated location', generatedLocation);

        currentUrl = new URL(generatedLocation);
      }

      console.log('current url', currentUrl);

      // Update the specific query parameter we're controlling
      currentUrl.searchParams.set('path', `d-${mapshot.unique_id}`);

      setIframeSrc(currentUrl.toString());
    };

    updateIframeSrc();

    // Set up a message listener to detect URL changes in the iframe
    const handleMessage = (event: MessageEvent<any>) => {
      if (event.data === 'urlChanged') {
        updateIframeSrc();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [saveDir, mapshot]);

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      width="100%"
      height="100%"
      frameBorder="0"
      title="Controlled iframe"
    />
  );
}