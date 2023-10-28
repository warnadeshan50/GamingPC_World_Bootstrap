
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
        let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_name">${item.customer_name}</td><td class="customer_address">${item.customer_address}</td><td class="customer_email">${item.customer_email}</td><td class="customer_tel">${item.customer_tel}</td></tr>`;
        $('#customer-tbl-body').append(tbl_row);
    });

};
const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;$('#cu_next-btn>button').eq(0).on('click', () => {

    let customer_id = $('#customer_id_txt').val();
    let customer_name = $('#cu_customer_name_txt').val();
    let customer_address = $('#customer_address_txt').val();
    let customer_email = $('#customer_email_txt').val();
    let customer_tel =$('#customer_tel_txt').val();


    if(customer_id) {

        if(customer_name) {

            if(customer_address) {

                if(customer_email) {

                    let isValid = sriLankanMobileNumberRegex.test(customer_tel);
                    if (customer_tel && isValid) {

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
    $()

    console.log("customer_id: ", customer_id);
});
$("#customer_table>tr").click(function() {
    var selected = $(this).hasClass("highlight");
    $("#data tr").removeClass("highlight");
    if(!selected)
        $(this).addClass("highlight");
});