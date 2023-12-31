let currentProducts = products;
let categories = new Set();
let addToBasketButtons;

const basket = [];

const productsSection = document.querySelector(".products");


const addToBasket = (e) => {
    const selectedID = parseInt(e.target.dataset.id); //po kliknięciu znajduje id produktu

    const key = currentProducts.findIndex((product) => product.id === selectedID);

    basket.push(currentProducts[key]);

    const basketTotal = basket.reduce((sum, product) => { return sum += product.price}, 0); //sumuje ceny

    basketTotal > 0
    ? basketClearBtn.classList.add("active") 
    : basketClearBtn.classList.remove("active");

    basketAmountSpan.innerHTML = `${basketTotal} zł`; //cena zamiast Cart
};


const renderProducts = (items) => {
    productsSection.innerHTML = "";
    for (let i=0; i < items.length; i++) {
        const newProduct = document.createElement("div"); //Tworzy nowy element HTML typu div, który zostanie użyty do reprezentacji produktu na stronie.
        newProduct.className = `product_item ${items[i].sale ? "on_sale" : ""}`; //Nadaje nowemu elementowi klasę CSS "product_item". Jeśli dany produkt jest w sprzedaży (czyli ma ustawioną wartość sale na true), to nadaje również klasę "on_sale", co pozwoli na zastosowanie odpowiednich stylów CSS do produktu w sprzedaży.
//Ustala zawartość wewnętrzną nowego elementu div, tworząc strukturę HTML dla produktu. Wszystkie informacje o produkcie, takie jak obraz, nazwa, opis i cena, są dynamicznie wstawiane na podstawie danych z tablicy items.        
        newProduct.innerHTML = `<img src = "${items[i].image}" alt="product_image"/> 
        <p class="product_name">${items[i].name}</p>
        <p class = "product_description">${items[i].description}</p>
            <div class="product_price">
                <span class="price">${items[i].price.toFixed(2)} zł</span>
                <span class="price_sale"> ${(items[i].price - items[i].saleAmount).toFixed(2)} zł</span>
            </div>
        <button data-id="${items[i].id}"
        class="add_to_basket">Add to cart</button>
        <p class="product_item_sale_info">Sale</p>`;
    productsSection.appendChild(newProduct); //Dodaje nowo utworzony element div do sekcji produktów na stronie internetowej, umieszczając go wewnątrz tej sekcji.
}
addToBasketButtons = document.querySelectorAll(".add_to_basket");
addToBasketButtons.forEach((btn) =>
  btn.addEventListener("click", addToBasket)
);
};

const renderCategories = (items) => {
//Set bo nie będą się potwarzać kategorie
for (let i = 0; i < items.length; i++) {
    categories.add(items[i].category);
}

   const categoriesItems = document.querySelector(".categories_items"); 

    
    
    categories = ['all products',...categories]; //zmieniło set na tablice

    categories.forEach((category, index) => {
        const newCategory = document.createElement("button"); //Tworzy nowy element HTML typu button
        newCategory.innerHTML = category; 
        newCategory.dataset.category = category; //dodaje do buttona w html category 

        index === 0? newCategory.classList.add("active") : ""; //Wybrany jest button z indexem 0

        categoriesItems.appendChild(newCategory); 
    });
};



document.onLoad = renderCategories(currentProducts);
document.onLoad = renderProducts(currentProducts);
//odpala przy starcie strony


const categoriesButtons = document.querySelectorAll(".categories_items button");

categoriesButtons.forEach((button) =>    //tworzy tablice tylko z kategorią którą wybraliśmy
    button.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        categoriesButtons.forEach((button) => button.classList.remove("active"));
        e.target.classList.add("active");

        currentProducts = products;   //przed zmiana kategori tablica zmiania sie na "wszystlkie" i z nich wybiera konkretnie wybrane

        if(category === "all products") {
            currentProducts = products;
        } else {
            currentProducts = currentProducts.filter(
                (product) => product.category=== category
                );
            }
            renderProducts(currentProducts);
    })
);


const searchBarInput = document.querySelector(".search_bar input");

searchBarInput.addEventListener("input", (e) => {
    const search = e.target.value;

    const foundProducts = currentProducts.filter((product) =>{
        if (product.name.toLowerCase().includes(search.toLowerCase())) {
            return product;
        }
    })

    const emptyState = document.querySelector(".empty_state");

    foundProducts.length === 0 
    ? emptyState.classList.add("active") 
    : emptyState.classList.remove("active");


    renderProducts(foundProducts);
});

const basketClearBtn = document.querySelector(".basket_clear_button");
const basketAmountSpan = document.querySelector(".basket_amount"); 


    const clearBasket = () => {
         basketAmountSpan.innerHTML = "Cart";
         basket = [];
    };

basketClearBtn.addEventListener("click", clearBasket);

addToBasketButtons.forEach((button) => button.addEventListener("click",addToBasket)); 