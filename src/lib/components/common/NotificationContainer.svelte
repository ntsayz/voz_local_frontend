<script lang="ts">
    export let notifications: string[] = []; // List of notifications
    export let entryDirection: "top" | "bottom" = "bottom"; // Entry direction
    export let autoCycle = true; // Auto cycle notifications
    export let cycleInterval = 5000; // Interval in ms for cycling notifications
  
    let currentNotificationIndex = 0;
  
    function cycleNotifications() {
      currentNotificationIndex = (currentNotificationIndex + 1) % notifications.length;
    }
  
    // Auto-cycle notifications if enabled
    if (autoCycle && notifications.length > 1) {
      setInterval(cycleNotifications, cycleInterval);
    }
  </script>
  
  <div
    class="notification-container {entryDirection}"
    title="Hover for more info"
  >
    <div class="notification-content">
      {notifications[currentNotificationIndex]}
    </div>
  </div>
  
  <style>
    .notification-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      max-width: 90%; /* Stretch up to 90% of the parent container width */
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.2); /* Glassy background */
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: slide-in-out 5s ease-in-out infinite;
      z-index: 10;
      overflow-wrap: break-word; /* Ensures text wraps properly */
      max-height: 500px; /* Limit maximum height */
      overflow-y: auto; /* Add vertical scroll if content exceeds height */
      transition: transform 0.5s ease, color 0.3s ease; /* Add transition for hover effect */
    }
  
    /* Hover Effect for Container */
    .notification-container:hover {
      transform: translateX(-50%) translateY(-10px); /* Move the container up slightly */
      color: #000;
    }
  
    /* Entry Direction Styling */
    .notification-container.bottom {
      bottom: 10px;
    }
  
    .notification-container.top {
      top: 10px;
    }
  
    /* Keyframes for sliding */
    @keyframes slide-in-out {
      0% {
        transform: translateY(30px);
        opacity: 0;
      }
      10% {
        transform: translateY(0);
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(30px);
        opacity: 0;
      }
    }
  
    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .notification-container {
        max-width: 95%;
        padding: 8px 16px;
        font-size: 12px;
      }
    }
  </style>