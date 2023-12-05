import {customer_db, item_db} from '../DB/db.js';
import {ItemModel} from '../model/ItemModel.js';
import{CustomerModel}from'../model/CustomerModel'
// function generateNextId() {
//     order_db.sort((a, b) => a.order_id.localeCompare(b.order_id));
//     if (order_db.length === 0) { return "O-0001"; }
//     const last = order_db[order_db.length - 1];
//     const lastIdNumber = parseInt(last.order_id.slice(2), 10);
//     const nextIdNumber = lastIdNumber + 1;
//     return `O-${nextIdNumber.toString().padStart(4, '0')}`;
// }
$('#item_codes').on('click', () => {
    loadItems();
});
$('#customer_ids').on('click', () => {
    loadCustomers();
});
const loadCustomers = () => {
    let title = $('<option>', { text: '-Set Customer-', value: 'title' });
    $("#customer_ids").append(title);
    customer_db.map((customer, index) => {
        let option = $('<option>', { text: customer.customer_id, value: customer.customer_id });
        $("#customer_ids").append(option);
    });
};

const loadItems = () => {
    let title = $('<option>', { text: '-Select Item-', value: 'title' });
    $("#item_codes").append(title);
    item_db.map((item, index) => {
        let option = $('<option>', { text: item.item_code, value: item.item_code });
        $("#item_codes").append(option);
    });
};