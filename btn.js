document.addEventListener("DOMContentLoaded", function () {
       const cartKey = "shoppingCart";
       let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
       const cartItemsElement = document.getElementById("cart-items");

       updateCart();

       
       document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".product");
            const productName = productElement.querySelector("h3").innerText;
            const productPrice = productElement.querySelector("p").innerText;
            const productImage = productElement.querySelector("img").src;

            if (!productImage) {
                console.error("Зображення не знайдено для товару:", productName);
                return;
            }
            
            const product = {
                name: productName,
                price: productPrice,
                jpg: productImage,
            };
            cart.push(product);
            saveCart();
            updateCart();
        });
    });
   
       
       function updateCart() {
              cartItemsElement.innerHTML = ""; 
          
              cart.forEach((item, index) => {
                  // Створення елемента списку
                  const imageSrc = item.jpg ? item.jpg : "path/to/default-image.jpg";
                  const listItem = document.createElement("li");
                  listItem.innerHTML = `
                      <div class="cart-item-content">
                          <img src="${imageSrc}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                          <span>${item.name} - ${item.price}</span>
                          <div class="remove-item" data-index="${index}">×</div>
                      </div>
                  `;
                  cartItemsElement.appendChild(listItem);
              });
          
              // Додавання обробника події для видалення
              document.querySelectorAll(".remove-item").forEach(button => {
                  button.addEventListener("click", function () {
                      const index = parseInt(this.getAttribute("data-index")); // Отримання індексу
                      cart.splice(index, 1); // Видалення товару з масиву
                      saveCart(); // Збереження оновленого кошика
                      updateCart(); // Оновлення відображення кошика
                  });
              });
          }
          
          
              // Збереження кошика в Local Storage
       function saveCart() {
              localStorage.setItem(cartKey, JSON.stringify(cart));
          }
      
              // Відображення модального вікна кошика
       document.getElementById("cart-button").addEventListener("click", function () {
              const cartModal = document.getElementById("cart");
              cartModal.style.display = "block";
          });
      
              // Закриття модального вікна кошика
       document.querySelector("#cart .close").addEventListener("click", function () {
              const cartModal = document.getElementById("cart");
              cartModal.style.display = "none";
          });
              // Перенаправлення на сторінку order.html
          document.getElementById('checkout').addEventListener('click', function () {
              window.location.href = 'order.html';
          });

});
   