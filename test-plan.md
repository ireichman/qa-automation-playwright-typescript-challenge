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


|TCID|Test Name                                                                                             |Test comments / description                     |
|----|------------------------------------------------------------------------------------------------------|------------------------------------------------|
|1   |visiting main page                                                                                    |Tested with tcid2.                              |
|2   |load login page with performance metrics @fast @tcid2 @smoke @regression @performance                 |Completed - Could add more metrics though.      |
|3   |login page compatability - check for mobile view @fast @compatibility @login @smoke @regression @tcid3|Completed. Testing with Samsung Galaxy S22 res. |
|4   |main page responsive - desktop                                                                        |Test compatibility with large screens           |
|5   |Successful login -  ${user.name} @fast @login @smoke @regression @tcid5                               |Completed.                                      |
|6   |Unsuccessful login - invalid username and valid password @fast @login @smoke @regression @tcid6       |Completed - uses random strings for user and PWD|
|7   |Unsuccessful login - bad username and good password @fast @login @smoke @regression @tcid7            |Completed - Random string for user and valid PWD|
|8   |Unsuccessful login - good username and invalid password @fast @login @regression @tcid8               |Completed - Random string for PWD and valid user|
|9   |Login timeout @slow, @logout @login @smoke @regression @tcid9                                         |Will not be completed due to time limitation.   |
|10  |Logout after successful login @fast @logout @login @smoke @regression @tcid10                         |Completed.                                      |
|11  |input sanitization - check XSS vulnerability                                                          |                                                |
|12  |cart badge - add 1 item to cart indicated in badge @fast @cart @regression @tcid12                    |Completed                                       |
|13  |cart badge - add all items to cart indicated in badge @fast @cart @regression @tcid13                 |Completed                                       |
|14  |cart badge - add 1 item to cart and remove it indicated in badge @fast @cart @regression @tcid14      |Completed                                       |
|15  |add item to cart indicated in cart                                                                    |Completed                                       |
|16  |add 1 Sauce Labs Bike Light to cart and remove it @fast @cart @tcid16                                 |Completed                                       |
|17  |checkout - 1 Sauce Labs Fleece Jacket, correct total price @fast @checkout @smoke @regression @tcid17 |Completed                                       |
|18  |checkout with 2 item - correct total price                                                            |                                                |
|19  |sorting items on main page from high to low                                                           |                                                |
|20  |e2e - login, checkout with 1 item, and logout @fast @e2e @smoke @regression @tcid20                   |Completed                                       |
|21  |Security - check for HTTPS @fast @security @login @smoke @regression @tcid21                          |Completed - Server does not use strict security.|
|22  |Check for broken links                                                                                |                                                |
|23  |Log in and out items stay in cart.                                                                    |                                                |
|24  |Visual user does not see all items and one picture is worng.                                          |                                                |





