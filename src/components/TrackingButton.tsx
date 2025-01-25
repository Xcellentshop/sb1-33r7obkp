import React from 'react';
import { useTracking } from '../hooks/useTracking';

interface TrackingButtonProps {
  eventName: string;
  eventData?: Record<string, any>;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackingButton({
  eventName,
  eventData = {},
  href,
  className,
  children
}: TrackingButtonProps) {
  const { trackEvent } = useTracking();

  const handleClick = (e: React.MouseEvent) => {
    trackEvent(eventName, {
      ...eventData,
      button_text: typeof children === 'string' ? children : undefined,
      button_url: href
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}