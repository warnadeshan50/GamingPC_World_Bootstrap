
import {customer_db} from '../DB/db.js';
import {CustomerModel} from '../model/CustomerModel.js';
const cleanInputs = () => {
    $('#customer_id_txt').val('');
    $('#cu_customer_name_txt').val('');
    $('#customer_address_txt').val('');
    $('#customer_email_txt').val('');
    $('#customer_tel_txt').val('');
};
const loadCustomers = () => {

    $('#customer-tbl-body').empty();

    customer_db.map((item, index) => {
        let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_name">${item.customer_name}</td>
        <td class="customer_address">${item.customer_address}</td><td class="customer_email">${item.customer_email}</td><td class="customer_tel">${item.customer_tel}</td></tr>`;
        $('#customer-tbl-body').append(tbl_row);
    });

};
const customerIdRegx = /^(CU)[0-9]{4,5}$/;
const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const mailRegx=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// add customer
$('#cu_next-btn>button').eq(0).on('click', () => {

    let customer_id = $('#customer_id_txt').val();
    let customer_name = $('#cu_customer_name_txt').val();
    let customer_address = $('#customer_address_txt').val();
    let customer_email = $('#customer_email_txt').val();
    let customer_tel =$('#customer_tel_txt').val();

    let isValidCustomerID=customerIdRegx.test(customer_id)
    if(customer_id && isValidCustomerID) {

        if(customer_name) {

            if(customer_address){
                let isValidMail = mailRegx.test(customer_email);
                if(customer_email && isValidMail) {

                    let isValidTel = sriLankanMobileNumberRegex.test(customer_tel);
                    if (customer_tel && isValidTel) {

                        let customer = new CustomerModel(customer_id, customer_name, customer_address, customer_email, customer_tel);
                        customer_db.push(customer);

                        Swal.fire(
                            'Success!',
                            'Customer has been saved successfully!',
                            'success'
                        );

                        cleanInputs();
                        loadCustomers(); // call load customer function

                    } else {
                        toastr.error('Invalid Customer TelNo');
                    }

                } else {
                    toastr.error('Invalid Customer Email')
                }

            } else {
                toastr.error('Invalid Customer Address');
            }

        } else {
            toastr.error('Invalid Customer Name');
        }

    } else {
        toastr.error('Invalid Customer Id');
    }

});

// table selected show in text

$('#customer-tbl-body').on('click', 'tr' , function() {
    let index = $(this).index();

    let customer_id = $(this).find('.customer_id').text();
    let customer_name = $(this).find('.customer_name').text();
    let customer_address = $(this).find('.customer_address').text();
    let customer_email = $(this).find('.customer_email').text();
    let customer_tel = $(this).find('.customer_tel').text();

    $('#customer_id_txt').val(customer_id);
    $('#cu_customer_name_txt').val(customer_name);
    $('#customer_address_txt').val(customer_address);
    $('#customer_email_txt').val(customer_email);
    $('#customer_tel_txt').val(customer_tel);

    console.log("customer_id: ", customer_id);
});

// update customer
$("#cu_next-btn>button[type='button']").eq(1).on("click", () => {
    let customer_id = $("#customer_id_txt").val();
    let customer_name = $("#cu_customer_name_txt").val();
    let customer_address = $("#customer_address_txt").val();
    let customer_email = $("#customer_email_txt").val();
    let customer_tel = $("#customer_tel_txt").val();
    let isValidCustomerID=customerIdRegx.test(customer_id)
    if(customer_id && isValidCustomerID) {

        if(customer_name) {

            if(customer_address){
                let isValidMail = mailRegx.test(customer_email);
                if(customer_email && isValidMail) {

                    let isValidTel = sriLankanMobileNumberRegex.test(customer_tel);
                    if (customer_tel && isValidTel) {

                            let customer = new CustomerModel(customer_id, customer_name, customer_address, customer_email, customer_tel);
                            let index = customer_db.findIndex(customer => customer.customer_id === customer_id);
                            customer_db[index] = customer;
                            loadCustomers();
                            Swal.fire({width: '225px', position: 'center', icon: 'success', title: 'Updated!', showConfirmButton: false, timer: 2000});
                        } else {
                        toastr('Invalid Tel.No!');
                        }
                    } else {
                    toastr('Invalid Email!');
                    }
                } else {
                toastr('Invalid Address!');
                }
            } else {
            toastr('Invalid Name');
            }
        } else {
        toastr('Invalid customer ID!');
    }
});

// Delete Customer

$("#cu_next-btn>button[type='button']").eq(2).on("click", () => {
    let customer_id = $("#customer_id_txt").val();
    let isValidCustomerID=customerIdRegx.test(customer_id)
    if(customer_id && isValidCustomerID) {
        Swal.fire({width: '300px', title: 'Delete Customer', text: "Are you sure you want to permanently remove this customer?", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                let index = customer_db.findIndex(customer => customer.customer_id === customer_id);
                customer_db.splice(index, 1);
                loadCustomers()
                Swal.fire({width: '225px', position: 'center', icon: 'success', title: 'Deleted!', showConfirmButton: false, timer: 2000});
            }
        });
    } else {
        toastr('Invalid customer ID format!');
    }
});

// Search Customer

$('#customer_search_box').on('input', () => {
    let search_term = $('#customer_search_box').val();
    if(search_term){
        $('#customer_search_tbl_body').empty();
        let results = customer_db.filter((customer) =>
            customer.customer_id.toLowerCase().startsWith(search_term.toLowerCase()) ||
            customer.name.toLowerCase().startsWith(search_term.toLowerCase()) ||
            customer.address.startsWith(search_term.toLowerCase()));
        results.map((customer, index) => {
            let record = `<tr><td class="customer_id">${customer.customer_id}</td><td class="name">${customer.customer_name}</td>
                      <td class="address">${customer.customer_address}</td><td class="email">${customer.customer_email}</td><td class="email">${customer.customer_tel}</td></tr>`;
            $("#customer_search_tbl_body").append(record);
        });
    }else{
        $('#customer_search_tbl_body').empty();
    }
});