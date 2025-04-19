# Testing [saucedemo.com](https://www.saucedemo.com)

Minimal test plan to accomadate for time limits.
The list of tests will be ammended as time allows.

## Features to test:
* Login
* Logout
* Side menu
* Product page
* Shopping cart
* Checkout


| Test number | Test name                                              | Test comments/ description        |
|-------------|--------------------------------------------------------|-----------------------------------|
|1            |visiting main page                                      |Should include performance metrics |
|2            |main page responsive                                    |Test mobile and desktop 1280 x 800 |
|3            |login successful                                        |Using known valid user             |
|4            |login failure                                           |Generate a string for user and pwd |
|5            |login mix creds bad PWD|Mix valid user with invalid PWD |                                   |
|6            |login mix creds bad user|Mix invalid user with valid PWD|                                   |
|7            |add 1 item to cart indicated in badge                   |                                   |
|8            |add all items to cart indicated in badge                |                                   |
|9            |remove item from cart on main page                      |                                   |
|10           |remove item from cart in cart page                      |                                   |  
|11           |add 1 item to cart showing in cart                      |                                   |
|12           |add all item to cart showing in cart                    |                                   |
|13           |checkout with 1 item - total price is correct           |                                   |
|14           |checkout with 2 items - total price is correct          |                                   |
|15           |E2E purchase                                            |                                   |
|16           |logout test                                             |                                   |
|17           |input sanitization- chec XSS vulnerability              |                                   |
|18           |product sorting low - high                              |                                   |
|19           |login timeout                                           |                                   |




