$('#customer_section').css('display', 'none');
$('#item_section').css('display', 'none');
$('#order_section').css('display', 'none');
$('#invoice_section').css('display', 'none');

$('#about_nav').on('click', () => {
    $('#dashboard_section').css('display', 'block');
    $('#customer_section').css('display', 'none');
    $('#item_section').css('display', 'none');
    $('#order_section').css('display', 'none');
    $('#invoice_section').css('display', 'none');
});

$('#customer_nav').on('click', () => {
    $('#dashboard_section').css('display', 'none');
    $('#customer_section').css('display', 'block');
    $('#item_section').css('display', 'none');
    $('#order_section').css('display', 'none');
    $('#invoice_section').css('display', 'none');
});

$('#item_nav').on('click', () => {
    $('#dashboard_section').css('display', 'none');
    $('#customer_section').css('display', 'none');
    $('#item_section').css('display', 'block');
    $('#order_section').css('display', 'none');
    $('#invoice_section').css('display', 'none');
});

$('#order_nav').on('click', () => {
    $('#dashboard_section').css('display', 'none');
    $('#customer_section').css('display', 'none');
    $('#item_section').css('display', 'none');
    $('#order_section').css('display', 'block');
    $('#invoice_section').css('display', 'none');
});

$('#invoice_nav').on('click', () => {
    $('#dashboard_section').css('display', 'none');
    $('#customer_section').css('display', 'none');
    $('#item_section').css('display', 'none');
    $('#order_section').css('display', 'none');
    $('#invoice_section').css('display', 'block');
});