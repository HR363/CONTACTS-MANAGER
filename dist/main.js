import { Contact } from './contact.js';
import { ContactManager } from './contactManager.js';
const manager = new ContactManager();
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const companyInput = document.getElementById('company');
const searchInput = document.getElementById('search');
const contactList = document.getElementById('contacts-list');
const cancelBtn = document.getElementById('cancel-btn');
const title = document.getElementById('form-title');
let editingId = null;
function generateId() {
    return Date.now().toString();
}
function clearForm() {
    form.reset();
    editingId = null;
    cancelBtn.style.display = 'none';
    title.textContent = 'Add Contact';
}
function renderContacts(contacts = manager.getAll()) {
    contactList.innerHTML = '';
    if (contacts.length === 0) {
        contactList.innerHTML = `<div class="empty-state">
        <h3>No contacts yet</h3>
        <p>Add your first contact to get started</p>
    </div>`;
        return;
    }
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-item';
        div.innerHTML = `
      <div class="contact-name">${contact.name}</div>
      <div class="contact-details">
        <span>Email: ${contact.email}</span>
        <span>Phone: ${contact.phone}</span>
        <span>Company: ${contact.company}</span>
      </div>
      <div class="contact-actions">
        <button class="btn-small btn-edit">Edit</button>
        <button class="btn-small btn-delete">Delete</button>
      </div>
    `;
        div.querySelector('.btn-edit').addEventListener('click', () => {
            editingId = contact.id;
            nameInput.value = contact.name;
            emailInput.value = contact.email;
            phoneInput.value = contact.phone;
            companyInput.value = contact.company;
            cancelBtn.style.display = 'inline-block';
            title.textContent = 'Edit Contact';
        });
        div.querySelector('.btn-delete').addEventListener('click', () => {
            manager.delete(contact.id);
            renderContacts();
        });
        contactList.appendChild(div);
    });
}
form.addEventListener('submit', e => {
    e.preventDefault();
    const newContact = new Contact(editingId !== null && editingId !== void 0 ? editingId : generateId(), nameInput.value, emailInput.value, phoneInput.value, companyInput.value);
    if (editingId) {
        manager.update(newContact);
    }
    else {
        manager.add(newContact);
    }
    clearForm();
    renderContacts();
});
cancelBtn.addEventListener('click', clearForm);
searchInput.addEventListener('input', () => {
    renderContacts(manager.search(searchInput.value));
});
renderContacts();
