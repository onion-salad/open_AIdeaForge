import React, { useState, useEffect } from 'react';
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

const Notification = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <Toaster>
      <Toast>
        <div className="text-sm font-medium">{message}</div>
      </Toast>
    </Toaster>
  );
};

export default Notification;