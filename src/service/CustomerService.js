export class CustomerService {
    getCustomersLarge() {
        return fetch('/test/data/customers.json').then(res => res.json()).then(d => d.data);
    }
}