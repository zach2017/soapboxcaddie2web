export default function InHomeBuyButton() {


    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
        } else {
            loadScript();
        }
    } else {
        loadScript();
    }
    function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
            domain: 'soapboxcaddie.myshopify.com',
            storefrontAccessToken: '6d0a0c26112ae680f671fd5857e0a74e',
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                id: '6671451881662',
                variantId: '42878015832254',
                node: document.getElementById('product-component-1720120466041'),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0",
                                    "margin-bottom": "50px"
                                },
                                "text-align": "left"
                            },
                            "title": {
                                "font-size": "26px"
                            },
                            "price": {
                                "font-size": "18px"
                            },
                            "compareAt": {
                                "font-size": "15.299999999999999px"
                            },
                            "unitPrice": {
                                "font-size": "15.299999999999999px"
                            }
                        },
                        "buttonDestination": "checkout",
                        "layout": "horizontal",
                        "contents": {
                            "img": false,
                            "imgWithCarousel": true,
                            "options": false,
                            "description": true
                        },
                        "width": "100%",
                        "text": {
                            "button": "Buy now"
                        },
                        "variantId": "42878015832254"
                    },
                    "productSet": {
                        "styles": {
                            "products": {
                                "@media (min-width: 601px)": {
                                    "margin-left": "-20px"
                                }
                            }
                        }
                    },
                    "modalProduct": {
                        "contents": {
                            "img": false,
                            "imgWithCarousel": true,
                            "button": false,
                            "buttonWithQuantity": true
                        },
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0px",
                                    "margin-bottom": "0px"
                                }
                            },
                            "title": {
                                "font-family": "Helvetica Neue, sans-serif",
                                "font-weight": "bold",
                                "font-size": "26px",
                                "color": "#4c4c4c"
                            },
                            "price": {
                                "font-family": "Helvetica Neue, sans-serif",
                                "font-weight": "normal",
                                "font-size": "18px",
                                "color": "#4c4c4c"
                            },
                            "compareAt": {
                                "font-family": "Helvetica Neue, sans-serif",
                                "font-weight": "normal",
                                "font-size": "15.299999999999999px",
                                "color": "#4c4c4c"
                            },
                            "unitPrice": {
                                "font-family": "Helvetica Neue, sans-serif",
                                "font-weight": "normal",
                                "font-size": "15.299999999999999px",
                                "color": "#4c4c4c"
                            }
                        },
                        "text": {
                            "button": "Add to cart"
                        }
                    },
                    "option": {},
                    "cart": {
                        "text": {
                            "total": "Subtotal",
                            "button": "Checkout"
                        },
                        "popup": false
                    },
                    "toggle": {}
                },
            });
        });
    }

    return (<>
        <div id='product-component-1720120466041'></div>
    </>
    )
}