
    async function loadTableData() {
        try {
            const response = await fetch('http://localhost:8000/priceEvent'); 
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
    
            const events = await response.json();
    
            if (!Array.isArray(events.data)) {
                throw new Error('Неверный формат данных с сервера.');
            }
    
            console.log(events);
            const tbody = document.querySelector('.my-table2 tbody');
            tbody.innerHTML = ''; 
    
            events.data.forEach(event => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${event.name}</td>
                    <td>${event.description}</td>
                    <td>${event.people}</td>
                    <td>${event.age}</td>
                    <td>${event.price}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
            alert('Не удалось загрузить данные. Проверьте сервер.');
        }
    }
    
    document.addEventListener('DOMContentLoaded', loadTableData);
    

