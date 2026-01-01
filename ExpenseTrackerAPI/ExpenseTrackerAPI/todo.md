Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

Work on next: 
- fix notifications bug 
- if no values changed in update, dont send api call. show notif nothing changed


TO DO:
- use automapper
- add created at date for ex.Expenses
- Add pagination
- for update expense, can have an undo button to revert changes.
- Add notification toast messages for successfully adding, updating, and deleting expenses
- add end of week/month recaps
- add user settings where they can choose custom emojis for categories, revert confirmation popup settings
- add authetnciation, login, signup etc
- export to pdf/excel
- powerbi dashboard style ui 

Cool features to implement:
- Add a category called "Subscription" for recurring payments. Create a screen where user can see all subscriptions displayed with a cool visualisation. Each subscription is a rectangle, the bigger the rectangle, the more expensive the subscription.



DONE:
- Create CRUD Operations on backend
- add admin UI and separate endpoint and separate admin expense dto potentially
- Create shared components folder 
- Allow CRUD Operations on frontend
- Utilise DTOs instead of domain objects in endpoints, e.g. CreateExpenseDto, UpdateExpenseDto