import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Graph from './graph'



const NotificationIcon = ({ name, color, size }) => (
  <span className="material-icons" style={{ color, fontSize: size || 24 }}>
    {name}
  </span>
);

// Função de renderização de cada item de notificação
const NotificationItem = ({ item }) => (
  <div className="notification-item">
    <NotificationIcon name="notifications" color="#fff" />
    <span className="notification-title">{item.message}</span>
    <span className="notification-date">{item.date}</span>
    <span className="notification-time">{item.time}</span>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState(''); // Estado para a nova mensagem

  useEffect(() => {
    // Função para buscar as notificações
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/notifications'); // Ajuste a URL para o endpoint correto
        setNotifications(response.data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Função para adicionar uma nova notificação
  const addNotification = async () => {
    if (!newMessage) return; // Não faz nada se a mensagem estiver vazia

    try {
      const response = await axios.post('http://localhost:8080/api/notifications', {
        message: newMessage,
      });

      // Adiciona a nova notificação à lista existente
      const newNotification = {
        _id: response.data._id,
        message: response.data.message,
        date: response.data.date,
        time: response.data.time,
      };

      setNotifications((prev) => [newNotification, ...prev]); // Adiciona a notificação no início da lista
      setNewMessage(''); // Limpa o campo de entrada
    } catch (error) {
      console.error('Erro ao adicionar notificação:', error);
    }
  };

  // Se não houver notificações, renderizar nada
  if (notifications.length === 0) return <div>Carregando notificações...</div>;

  return (
    <div className="container">

      {/* Última notificação destacada */}
      <div className="last-notification">
        <div className="main-notification">
          <NotificationIcon name="notifications" color="#fff" size={64} />
          <div className='main-notification-infos'>
            <span className="main-notification-time">{notifications[0].time}</span>
            <span className="main-notification-date">{notifications[0].date}</span>
            <span className="main-notification-title">{notifications[0].message}</span>
          </div>
        </div>
      </div>

      <h1>Notificações</h1>

      {/* Lista de notificações a partir do segundo item */}
      <div className="notifications-list">
        {notifications.slice(1).map((notification) => (
          <NotificationItem key={notification._id} item={notification} />
        ))}
      </div>


      <Graph />
    
      {/*<input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Digite sua nova notificação"
      />
      <button onClick={addNotification}>Adicionar Notificação</button>*/} 
    </div>
  );
};

export default Notifications;
