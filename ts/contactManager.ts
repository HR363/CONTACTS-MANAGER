import { Contact } from './contact.js';

export class ContactManager {
  private contacts: Contact[] = [];

  constructor() {
    this.load();
  }

  private save(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  private load(): void {
    const stored = localStorage.getItem('contacts');
    if (stored) {
      this.contacts = JSON.parse(stored);
    }
  }

  public getAll(): Contact[] {
    return this.contacts;
  }

  public add(contact: Contact): void {
    this.contacts.push(contact);
    this.save();
  }

  public update(updated: Contact): void {
    this.contacts = this.contacts.map(c => c.id === updated.id ? updated : c);
    this.save();
  }

  public delete(id: string): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
    this.save();
  }

  public search(term: string): Contact[] {
    const t = term.toLowerCase();
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(t) ||
      c.email.toLowerCase().includes(t) ||
      c.phone.includes(term) ||
      c.company.toLowerCase().includes(t)
    );
  }
}
