Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

Work on next: 
- authentication (login, signup)
- authorisation (only show admin dashboard if IsAdmin = 1)


TO DO:
- fix notifications bug 
- if no values changed in update, dont send api call. show notif nothing changed
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
- Smart categorisation
- Monthly budget + warnings
- Recurring expenses detection
- Frictionless input. Inline quick add -> £12.50 coffee -> parses into amount + category + name. Massively reduces friction
- "Where did my money go?" . Biggest category this month. Biggest increase vs last month. Top 3 merchants.
- Month to month comparison. % increase/decrease per category. 
- Spending anomalies. Unusually large transactions. Unusual category spend.
- Financial health score. Score based on budget adherence, savings rate, expense volatility. Explain why the score changed. 
- Regret tagging. User mark expense as thumbs up (worth it), neutral (meh face), thumbs down (regret). Over time, show stats on regret vs non-regret purchases.
You regretted 5 purchases at Pret last month (£38).
- "Invisible money" view. Small-recurring expenses. Sub-£5 purchases. You spent £127 on purchases under £5. Insightful and surprising
- Time based clustering. Morning/afternoon/evening purchases. Weekday vs weekend. Show patterns in spending behaviour. You spend 2x more after 9pm. Behavioural insights. 
- Voice input for adding expenses. Can do lots in one go.
- Reports -> export as pdf, excel etc. Date-locked summaries. 
- Financial seasons -> Let users label months as "Holiday season", "Wedding season". Insights become fairer and smarter
- Attach notes to months -> "Moved house" "Started new job". When revisiting old data, context helps understand spending
- 


DONE:
- Create CRUD Operations on backend
- add admin UI and separate endpoint and separate admin expense dto potentially
- Create shared components folder 
- Allow CRUD Operations on frontend
- Utilise DTOs instead of domain objects in endpoints, e.g. CreateExpenseDto, UpdateExpenseDto
- use automapper
- add created at date for ex.Expenses
- rename components to use angular19+ version (e.g. remove .component. from home.component.html)