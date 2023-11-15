if (document.getElementById("productForm")) {
    document.getElementById("productForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var productName = document.getElementById("productName").value;
        var productPrice = parseFloat(document.getElementById("productPrice").value);
        var discount = parseFloat(document.getElementById("discount").value);
        var productImage = document.getElementById("productImage").files[0];

        var afterDiscount = productPrice - (productPrice * (discount / 100));

        // Create a new product object
        var newProduct = {
            name: productName,
            price: productPrice,
            discount: discount,
            afterDiscount: afterDiscount,
            image: productImage ? URL.createObjectURL(productImage) : null,
        };

        // localStorage.removeItem("products");

        var preProducts = JSON.parse(localStorage.getItem("products")) || [];

        // Add the new product to the array
        preProducts.push(newProduct);

        // Save the updated product array back to local storage
        localStorage.setItem("products", JSON.stringify(preProducts));

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("discount").value = "";
        document.getElementById("productImage").value = "";
        // window.location.href = "user.html";
    });

    document.getElementById("discount").addEventListener("input", function () {
        var productPrice = parseFloat(document.getElementById("productPrice").value);
        var discount = parseFloat(document.getElementById("discount").value);
        var afterDiscount = productPrice - (productPrice * (discount / 100));
        document.getElementById("afterDiscount").value = afterDiscount;
    });

} else if (document.getElementById("productList")) {

    document.addEventListener("DOMContentLoaded", function () {
        var products = JSON.parse(localStorage.getItem("products")) || [];

        var productList = document.getElementById("productList");

        products.forEach(function (product) {
            var productItem = document.createElement("li");
            productItem.className = "list-group-item";

            var img = document.createElement("div");
            img.className = "pic";
            var details = document.createElement("div");
            details.className = "details"

            details.innerHTML = `
                <strong>${product.name}</strong><br>
                Price: ${product.price}<br>
                Discount: ${product.discount}%<br>
                After Discount: ${product.afterDiscount}
            `;
            productItem.appendChild(img);
            productItem.appendChild(details);
            productList.appendChild(productItem);
        });
    });
}
