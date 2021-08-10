$(document).ready(function() {

    $("#admin-login-btn").click(function() {
        let username = $("#admin-username-field").val();
        let password =  $("#admin-password-field").val();

        $.ajax({
            url: "/admin/login",
            method: "post",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            contentType: "application/json",
            dataType: "json",
            success: (res) => {
                if (res.status == "success") {
                    window.location.href = res.dashboardUrl;
                }
                else {
                    alert("Invalid login");
                }
            },
            error: (err) => {

            }
        });
    });

    $("#contact-us-btn").click(function() {
        let name = $("#contact-name").val();
        let email = $("#contact-email").val();
        let msg = $("#contact-msg").val();

        $.ajax({
            url: "/contact-us",
            method: "post",
            data: JSON.stringify({
                name: name,
                email: email,
                msg: msg
            }),
            contentType: "application/json",
            dataType: "json",
            success: (res) => {
                if (res.status == "success") {
                    alert("Message sent successfully");
                }
                else {
                    alert("Could not send your message. Please try later!");
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    // Script for the admin dashboard page
    if ($(".admin-dashboard-content").length > 0) {

        // Get messages
        $.ajax({
            url: "/admin/messages",
            method: "get",
            dataType: "json",
            success: (res) => {
                res.forEach((message, index) => {
                    $("#messages-tbody").append(`
                        <tr>
                            <td>${message.username}</td>
                            <td>${message.email}</td>
                            <td>${message.body}</td>
                        </tr>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });

        // Get products
        $.ajax({
            url: "/admin/products",
            method: "get",
            dataType: "json",
            success: (res) => {
                $("#products-tbody").empty();
                res.forEach((product, index) => {
                    $("#products-tbody").append(`
                        <tr>
                            <td><img src="${product.image}" /></td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.quantity}</td>
                            <td>
                                <button data-product-id="${product.id}" onclick="deleteProduct(this)">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });

        // Get orders
        $.ajax({
            url: "/admin/orders",
            method: "get",
            dataType: "json",
            success: (res) => {
                $("#orders-tbody").empty();
                res.forEach((order, index) => {
                    $("#orders-tbody").append(`
                        <tr>
                            <td><img src="${order.product.image}"/></td>
                            <td>${order.product.name}</td>
                            <td>${order.product.price}</td>
                            <td>${order.quantity}</td>
                            <td>${order.shippingAddress}</td>
                        </tr>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });

        // Get appointments
        $.ajax({
            url: "/admin/appointments",
            method: "get",
            dataType: "json",
            success: (res) => {
                $("#appointments-tbody").empty();
                res.forEach((appointment, index) => {
                    $("#appointments-tbody").append(`
                        <tr>
                            <td>${appointment.pet_category}</td>
                            <td>${appointment.date_time.replace("T", " ").replace(":00.000Z", "")}</td>
                            <td>${appointment.detail}</td>
                        </tr>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });

        $("#add-in-stock-btn").click(function() {
            let productName = $("#prod-name").val();
            let productQty = $("#prod-qty").val();
            let productPrice = $("#prod-price").val();
            let productImage = $("#prod-image").val();
            
            $.ajax({
                url: "/admin/add-product",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    productName: productName,
                    productQty: productQty,
                    productPrice: productPrice,
                    productImage: productImage
                }),
                success: (res) => {
                    if (res.status == "success") {
                        alert("Product " + res.action + " successfully");

                        $("#prod-name").val("");
                        $("#prod-qty").val("");
                        $("#prod-price").val("");
                        $("#prod-image").val("");

                        window.location.href = window.location.href;
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    }


    // Script for pharmacy page
    if ($(".pharmacy-page-content").length > 0) {
        // Get products
        $.ajax({
            url: "/pharmacy/products",
            method: "get",
            dataType: "json",
            success: (res) => {
                $("#products-tbody").empty();
                res.forEach((product, index) => {
                    $("#products-tbody").append(`
                        <tr data-qty-in-stock="${product.quantity}" data-name="${product.name}" data-price="${product.price}">
                            <td><img src="${product.image}" /></td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button data-product-id="${product.id}" onclick="addToCart(this)">Add to cart</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });

        $(".cart-btn").click(function() {

            let cart = JSON.parse(localStorage.getItem("cart"));

            $("#cart-tbody").empty();

            if (cart != null) {
                cart.forEach((product, index) => {
                    $("#cart-tbody").append(`
                        <tr data-product-id="${product.id}">
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.quantity}</td>
                        </tr>
                    `);
                });

                $("#checkout-btn").css("display", "unset");
            }
            else {
                $("#checkout-btn").css("display", "none");
            }

            $("#cart-modal").modal("show");
        });

        $("#checkout-btn").click(function() {
            let cart = JSON.parse(localStorage.getItem("cart"));
            let shippingAddress = $("#shipping-address").val().trim();

            if (shippingAddress == "") {
                alert("Shipping Address is Required");
                return;
            }

            $.ajax({
                url: "/pharmacy/checkout",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    cart: cart,
                    shippingAddress: shippingAddress
                }),
                success: (res) => {
                    console.log(res);
                },
                error: (err) => {
                    console.log(err);
                }
            });

            $("#cart-modal").modal("hide");
            localStorage.removeItem("cart");
        });
    }
    else {
        $(".cart-btn").css("display", "none");
    }


    $("#book-appointment-btn").click(function() {

        let petType = $("#pet-type").val();
        let date = $("#appointment-date").val();
        let time = $("#appointment-time").val();
        let detail = $("#appointment-detail").val();

        $.ajax({
            url: "/appointment",
            method: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                petType: petType,
                date: date,
                time: time,
                detail: detail
            }),
            success: (res) => {
                if (res.status == "success") {
                    alert("Appointment made successfully");
                }
            },
            error: (err) => {
                console.log(err);
            }
        });

        $("#appointmen-modal").modal("hide");
    });

    // tabs related code
    $(".nav-tabs li").click(function() {

        $(".nav-tabs li").removeClass("active");
        $(this).addClass("active");

        $(".tab-body").css("display", "none");
        let tabBodyId = $(this).attr("data-target");
        $("#" + tabBodyId).css("display", "block");
    });
    let tabBodyId = $(".nav-tabs li.active:first-child").attr("data-target");
    $("#" + tabBodyId).css("display", "block");
});

function addToCart(btn) {
    let productId = $(btn).attr("data-product-id");
    let qtyInStock = $(btn).closest("tr").attr("data-qty-in-stock");
    let name = $(btn).closest("tr").attr("data-name");
    let price = $(btn).closest("tr").attr("data-price");

    if (qtyInStock == "0") {
        alert("Out of stock!");
        return;
    }

    if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    
    let cart = JSON.parse(localStorage.getItem("cart"));

    let found = false;
    cart.forEach((product, index) => {
        if (product.id == productId) {
            product.quantity = product.quantity + 1;
            found = true;
            return false;
        }
    });

    if (!found) {
        cart.push({
            id: productId,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteProduct(btn) {
    let productId = $(btn).attr("data-product-id");
    $.ajax({
        url: "/admin/product/" + productId,
        method: "delete",
        dataType: "json",
        success: (res) => {
            if (res.status == "success") {
                alert("Item deleted successfully!");
                window.location.href = window.location.href;
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
}