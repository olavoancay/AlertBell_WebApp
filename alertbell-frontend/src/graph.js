import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './graph.css';

const Graph = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/notifications/graph-data');
            const presenceData = response.data['Presença Detectada'];
            const doorbellData = response.data['Campainha Pressionada'];

            if (chartRef.current) {
                chartInstance.current = new Chart(chartRef.current, {
                    type: 'bar',
                    data: {
                        labels: ['Eventos'], 
                        datasets: [
                            {
                                label: 'Presença Detectada',
                                data: [presenceData], 
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Campainha Pressionada', 
                                data: [doorbellData], 
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    precision: 0,
                                }
                            },
                            x: {
                                display: false,
                              }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            }
                        }
                    },
                });
            }
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="graph-container">
            <h2>Gráfico de Notificações</h2>
            <div className="chart-wrapper">
                <canvas id="meuCanvas" ref={chartRef}/>
            </div>
        </div>
    );
};

export default Graph;