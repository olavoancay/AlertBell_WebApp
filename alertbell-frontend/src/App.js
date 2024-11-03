import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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

      setNotifications((prev) => [...prev, newNotification]); // Adiciona a notificação retornada
      setNewMessage(''); // Limpa o campo de entrada
    } catch (error) {
      console.error('Erro ao adicionar notificação:', error);
    }
  };

  return (
    <div className="container">
      <h1>Notificações</h1>
      {/* Renderiza cada notificação usando NotificationItem */}
      <div className="notifications-list">
        {notifications.map((notification) => (
          <NotificationItem key={notification._id} item={notification} />
        ))}
      </div>

      {/* Campo de entrada para nova notificação */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Digite sua nova notificação"
      />
      <button onClick={addNotification}>Adicionar Notificação</button>
    </div>
  );
};

export default Notifications;