  // Quando o DOM estiver completamente carregado
  document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Receita (Linha)
    const revenueCtx = document.getElementById('revenueCanvas').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Receita em R$',
                data: [12500, 19000, 15000, 21000, 25000, 28400, 22000, 24000, 26000, 28000, 30000, 32000],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#4361ee',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2b2d42',
                    titleFont: {
                        size: 14,
                        family: 'Poppins'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'Poppins'
                    },
                    padding: 12,
                    cornerRadius: 12,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Gráfico de Distribuição de Vendas (Rosca)
    const salesCtx = document.getElementById('salesCanvas').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Tecnologia', 'Varejo', 'Manufatura', 'Serviços', 'Outros'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#4361ee',
                    '#4cc9f0',
                    '#4ad66d',
                    '#f8961e',
                    '#ef233c'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#2b2d42',
                    titleFont: {
                        size: 14,
                        family: 'Poppins'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'Poppins'
                    },
                    padding: 12,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Animar cards de métricas quando entram na viewport
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    metricCards.forEach(card => {
        observer.observe(card);
    });

    // Simular atualização de dados em tempo real (para demonstração)
    setInterval(() => {
        // Atualizar valores aleatórios nos cards
        const metrics = [
            { selector: '.metric-card.revenue .metric-value', min: 280000, max: 300000 },
            { selector: '.metric-card.customers .metric-value', min: 1200, max: 1300 },
            { selector: '.metric-card.orders .metric-value', min: 350, max: 370 },
            { selector: '.metric-card.profit .metric-value', min: 45000, max: 48000 }
        ];

        metrics.forEach(metric => {
            const element = document.querySelector(metric.selector);
            if (element) {
                const currentValue = parseInt(element.textContent.replace(/\D/g, ''));
                const newValue = Math.floor(Math.random() * (metric.max - metric.min + 1)) + metric.min;
                
                // Animação suave
                let start = null;
                const duration = 1000;
                
                function animate(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const value = Math.floor(progress * (newValue - currentValue) + currentValue);
                    element.textContent = 'R$ ' + value.toLocaleString();
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(animate);
                    }
                }
                
                window.requestAnimationFrame(animate);
            }
        });
    }, 5000);
});