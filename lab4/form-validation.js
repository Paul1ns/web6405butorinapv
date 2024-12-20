
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const submitButton = document.getElementById('submitButton');
    const fields = {
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        name: document.getElementById('name'),
    };

    Object.keys(fields).forEach(key => {
        fields[key].addEventListener('input', () => validateField(key, fields[key]));
    });

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();  

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data); 

        const errors = validateForm(data);

        console.log(errors);

        if (errors.length > 0) {
            alert(`Ошибка: ${errors.join(', ')}`);
            return;
        }

        fetch('http://localhost:8000/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log('Успешная отправка:', result);
            form.reset();  
            alert(result.data.response || 'Ваша заявка успешно отправлена!');
        })
        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert('Не удалось отправить данные. Пожалуйста, попробуйте снова.');
        });
    });
});

function validateField(fieldName, field) {
    const value = field.value.trim();
    let error = '';

    switch (fieldName) {
        case 'email':
            if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                error = 'Некорректный адрес электронной почты';
            }
            break;
        case 'phone':
            if (value && !value.match(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
                error = 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX';
            }
            break;
        case 'name':
            if (value.length < 3) {
                error = 'Имя должно содержать не менее 3 символов';
            }
            break;
    }

    setFieldError(field, error);
}

function setFieldError(field, error) {
    const errorMessage = document.getElementById(`${field.id}-error`);

    if (error) {
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
        errorMessage.textContent = error;
    } else {
        field.classList.remove('invalid');
        field.removeAttribute('aria-invalid');
        errorMessage.textContent = ''; 
    }
}

function validateForm(data) {
    const errors = [];

    if (!data.email || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Некорректный адрес электронной почты');
    }

    if (!data.phone || !data.phone.match(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
        errors.push('Телефон должен быть в формате +7 (XXX) XXX-XX-XX');
    }

    if (!data.name || data.name.trim().length < 3) {
        errors.push('Имя должно содержать не менее 3 символов');
    }

    return errors;
}

