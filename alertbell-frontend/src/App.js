import React from 'react';
import './App.css';

const notifications = [
  { id: '1', time: '12:30', title: 'Campainha Tocada' },
  { id: '2', time: '12:00', title: 'Campainha Tocada' },
  { id: '3', time: '17:30', title: 'Campainha Tocada' },
  { id: '4', time: '12:30', title: 'Campainha Tocada' },
  { id: '5', time: '12:00', title: 'Campainha Tocada' },
];

const NotificationIcon = ({ name, color, size }) => (
  <span className="material-icons" style={{ color, fontSize: size || 24 }}>
    {name}
  </span>
);

// Função de renderização de cada item de notificação
const NotificationItem = ({ item }) => (
  <div className="notification-item">
    <NotificationIcon name="notifications" color="#fff" />
    <span className="notification-title">{item.title}</span>
    <span className="notification-time">{item.time}</span>
  </div>
);

function App() {
  return (
    <div className="container">
      {/* Main Notification */}
      <div className="main-notification">
        <NotificationIcon name="notifications" color="white" size={60} />
        <div className='main-notification-info'>
          <span className="main-notification-time">0:38</span>
          <span className="main-notification-text">Campainha tocada</span>
        </div>
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} item={notification} />
        ))}
      </div>
    </div>
  );
}

export default App;
