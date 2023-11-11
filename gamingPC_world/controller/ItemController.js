import {item_db} from '../DB/db.js';
import {ItemModel} from '../model/ItemModel.js';

const cleanInputsItems = () => {
    $('#it_item_code_txt').val('');
    $('#it_item_name_txt').val('');
    $('#category_cmb').val('Choose');
    $('#it_qty_txt').val('');
    $('#it_unit_price_txt').val('');
};
const loadItems = () => {

    //$('#item_table').empty();

    item_db.map((item, index) => {
        let it_tbl_row = `<tr><td class="item_code">${item.item_code}</td><td class="item_name">${item.item_name}</td><td class="category">${item.item_category}</td><td class="item_qty">${item.qty}</td><td class="unit_price">${item.unit_price}</td></tr>`;
        $('#item_table_body').append(it_tbl_row);
    });

};

const itemCodeRegx = /^(IT)[0-9]{4,5}$/;
const priceRegx = /^(?:[1-9]\d{0,4})(?:\.\d{1,2})?$/;
$('#it_next-btn>button').eq(0).on('click', () => {

    let item_code = $('#it_item_code_txt').val();
    let item_name = $('#it_item_name_txt').val();
    let category = $('#category_cmb').find('option:selected').text();
    let item_qty = $('#it_qty_txt').val();
    let unit_price =$('#it_unit_price_txt').val();

    let isValidItemID=itemCodeRegx.test(item_code)
    if(item_code && isValidItemID) {

        if(item_name) {

            if(category){

                if(item_qty) {
                    let isValidPrice=priceRegx.test(unit_price)
                    if (unit_price && isValidPrice) {

                        let item = new ItemModel(item_code,item_name,category,item_qty,unit_price);
                        item_db.push(item);

                        Swal.fire(
                            'Success!',
                            'Item has been saved successfully!',
                            'success'
                        );

                        cleanInputsItems();
                        loadItems(); // call load item function

                    } else {
                        toastr.error('Invalid Price');
                    }

                } else {
                    toastr.error('Invalid QTY')
                }

            } else {
                toastr.error('Invalid Category');
            }

        } else {
            toastr.error('Invalid Item Name');
        }

    } else {
        toastr.error('Invalid Item Code');
    }

});


$('#item_table_body').on('click', 'tr' , function() {
    let index = $(this).index();

    let item_code = $(this).find('.item_code').text();
    let item_name = $(this).find('.item_name').text();
    let item_category = $(this).find('.category').text();
    let qty = $(this).find('.item_qty').text();
    let unit_price = $(this).find('.unit_price').text();

    $('#it_item_code_txt').val(item_code);
    $('#it_item_name_txt').val(item_name);
    $('#category_cmb').select(item_category);
    $('#it_qty_txt').val(qty);
    $('#it_unit_price_txt').val(unit_price);

    console.log("Item_id: ", item_code);
    console.log(item_category);
});