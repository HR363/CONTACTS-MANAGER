export class ContactManager {
    constructor() {
        this.contacts = [];
        this.load();
    }
    save() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
    load() {
        const stored = localStorage.getItem('contacts');
        if (stored) {
            this.contacts = JSON.parse(stored);
        }
    }
    getAll() {
        return this.contacts;
    }
    add(contact) {
        this.contacts.push(contact);
        this.save();
    }
    update(updated) {
        this.contacts = this.contacts.map(c => c.id === updated.id ? updated : c);
        this.save();
    }
    delete(id) {
        this.contacts = this.contacts.filter(c => c.id !== id);
        this.save();
    }
    search(term) {
        const t = term.toLowerCase();
        return this.contacts.filter(c => c.name.toLowerCase().includes(t) ||
            c.email.toLowerCase().includes(t) ||
            c.phone.includes(term) ||
            c.company.toLowerCase().includes(t));
    }
}
