
const currentProducts = products;

const productsSection = document.querySelector(".products");
const renderProducts = (items) => {
    for (let i=0; i < items.length; i++) {
        const newProduct = document.createElement("div"); //Tworzy nowy element HTML typu div, który zostanie użyty do reprezentacji produktu na stronie.
        newProduct.className = `product_item ${items[i].sale ? "on_sale" : ""}`; //Nadaje nowemu elementowi klasę CSS "product_item". Jeśli dany produkt jest w sprzedaży (czyli ma ustawioną wartość sale na true), to nadaje również klasę "on_sale", co pozwoli na zastosowanie odpowiednich stylów CSS do produktu w sprzedaży.
//Ustala zawartość wewnętrzną nowego elementu div, tworząc strukturę HTML dla produktu. Wszystkie informacje o produkcie, takie jak obraz, nazwa, opis i cena, są dynamicznie wstawiane na podstawie danych z tablicy items.        
        newProduct.innerHTML = `<img src = "${items[i].image}" alt="product_image"/> 
        <p class="product_name">${items[i].name}</p>
        <p class = "product_description">${items[i].description}</p>
            <div class="product_price">
                <span class="price">${items[i].price.toFixed(2)}</span>
                <span class="price_sale"> ${(items[i].price - items[i].saleAmount).toFixed(2)}</span>
            </div>
        <button class="add_to_basket">Add to cart</button>
        
        <p class="product_item_sale_info">Sale</p>`;
    productsSection.appendChild(newProduct); //Dodaje nowo utworzony element div do sekcji produktów na stronie internetowej, umieszczając go wewnątrz tej sekcji.


}
};
document.onLoad = renderProducts(currentProducts);
//odpala przy starcie strony