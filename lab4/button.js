const openFormButton = document.getElementById('openFormButton');
        const overlay = document.getElementById('overlay');
        const form = document.getElementById('form');
        const closeFormButton = document.getElementById('closeFormButton');
        const submitButton = document.getElementById('submitButton');
    
        openFormButton.addEventListener('click', function() {
            overlay.style.display = 'flex';
            openFormButton.style.display = 'none';
        });
    
        closeFormButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            openFormButton.style.display = 'block';
        });
    
