const update_button = document.getElementById('update-btn');
const add_button = document.getElementById('add-btn');
const delete_button = document.getElementById('delete-btn');

const add_form = document.getElementById('add-section');
const update_form = document.getElementById('update-section');
const delete_form = document.getElementById('delete-section');

update_button.addEventListener('click', function() {
    add_form.style.display = 'none';
    delete_form.style.display = 'none';
    update_form.style.display = 'flex';
});

add_button.addEventListener('click', function() {
    update_form.style.display = 'none';
    delete_form.style.display = 'none';
    add_form.style.display = 'flex';
});

delete_button.addEventListener('click', function() {
    update_form.style.display = 'none';
    add_form.style.display = 'none';
    delete_form.style.display = 'flex';
});