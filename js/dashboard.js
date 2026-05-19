document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Chart.js for Defect Types
    const ctx = document.getElementById('defectChart').getContext('2d');
    
    Chart.defaults.color = '#a0aab2';
    Chart.defaults.font.family = "'Inter', sans-serif";
    
    const defectChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Holes',
                    data: [12, 19, 3, 5, 2, 3, 9],
                    backgroundColor: 'rgba(255, 51, 102, 0.7)',
                    borderColor: 'rgba(255, 51, 102, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Needle Lines',
                    data: [8, 11, 5, 8, 13, 7, 4],
                    backgroundColor: 'rgba(0, 255, 102, 0.7)',
                    borderColor: 'rgba(0, 255, 102, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Stains',
                    data: [4, 2, 7, 3, 5, 2, 6],
                    backgroundColor: 'rgba(255, 153, 0, 0.7)',
                    borderColor: 'rgba(255, 153, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8
                    }
                }
            }
        }
    });

    // 2. Simulate Live Camera Feed detections
    const bbox = document.getElementById('bbox');
    const fpsCounter = document.getElementById('fps-counter');
    const defectCounter = document.getElementById('defect-counter');
    const logTable = document.getElementById('log-table');
    
    let defectCount = 14;
    
    // Randomly show bounding boxes
    setInterval(() => {
        // 30% chance to detect something
        if (Math.random() > 0.7) {
            // Randomize position
            const top = 10 + Math.random() * 60; // 10% to 70%
            const left = 10 + Math.random() * 70; // 10% to 80%
            const width = 40 + Math.random() * 60;
            const height = 40 + Math.random() * 40;
            
            bbox.style.top = `${top}%`;
            bbox.style.left = `${left}%`;
            bbox.style.width = `${width}px`;
            bbox.style.height = `${height}px`;
            
            bbox.style.display = 'block';
            
            // Randomly update defect count
            if (Math.random() > 0.8) {
                defectCount++;
                defectCounter.textContent = defectCount;
                
                // Add to log
                const now = new Date();
                const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                const types = ['Needle Line', 'Hole', 'Stain'];
                const severities = [
                    '<span style="color: #ff9900;">Medium</span>',
                    '<span style="color: #ff3366;">High</span>',
                    '<span style="color: #00ff66;">Low</span>'
                ];
                
                const idx = Math.floor(Math.random() * types.length);
                
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid var(--border-color)';
                tr.innerHTML = `
                    <td style="padding: 1rem 0;">${timeString}</td>
                    <td style="padding: 1rem 0;">${types[idx]}</td>
                    <td style="padding: 1rem 0;">${severities[idx]}</td>
                    <td style="padding: 1rem 0;">R-${8000 + Math.floor(Math.random()*999)}</td>
                    <td style="padding: 1rem 0;"><a href="#" class="text-accent">View Image</a></td>
                `;
                
                logTable.insertBefore(tr, logTable.firstChild);
                
                // Keep only top 4
                if (logTable.children.length > 4) {
                    logTable.removeChild(logTable.lastChild);
                }
            }
            
            // Hide after 800ms
            setTimeout(() => {
                bbox.style.display = 'none';
            }, 800);
        }
    }, 2000);
    
    // Simulate fluctuating FPS
    setInterval(() => {
        const baseFps = 15;
        const fluctuation = (Math.random() * 1.5 - 0.7).toFixed(1);
        fpsCounter.textContent = `FPS: ${(baseFps + parseFloat(fluctuation)).toFixed(1)}`;
    }, 1000);
});
