📝 Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

🚀 Work on next: 
pass category keywords to hugging face api to improve category suggestions
refactor user-dashboard.component.ts so that quick input bar is its own separate component. refactor step by step and ensure feature still works.
two pounds -> £2. also two pound -> £2. also two pound fifty -> £2.50
improve category list to what is defined in categories.ts

category stuff:
// add clothes cos tshirt is not transportation, its clothes
// add category for coffee (i dont know what yet), but right now its "utilities"
// also for auto-categorisation, maybe we should hard-code some obvious ones to make more accurate
// plus it also means less API calls

also if ai confidence is low then highlight to indicate to user to check

ADD THIS
│   ├── quick-input-bar/              ← Quick text + voice
│   │   ├── quick-input-bar.component.ts
│   │   ├── quick-input-bar.component.html
│   │   └── quick-input-bar.component.scss

ADD THIS
│   ├── transcript-cleaner.service.ts ← NEW
│   ├── expense-parser.service.ts     ← NEW
│   └── speech-recognition.service.ts ← NEW


*****create transcript cleaner -see frictionless ux ideas*****

probs need to block updating expense whilst it calculates
see frictionless-ux-ideas.txt

📋 TO DO:
❌ Hybrid AI categorisation: keyword pre-filter (uber→Transportation) before calling HuggingFace API. Saves calls + improves accuracy for common expenses
❌ Money IN section
❌ show user name on navbar
❌ make swagger authorize button automatically pass jwt token instead of manual
❌ fix security issues in endpoints
❌ instead of form for create/update expense inline it so user doesn't need to move eyes. think of better ux
❌ fix notifications bug 
❌ if no values changed in update, dont send api call. show notif nothing changed
❌ Add pagination
❌ for update expense, can have an undo button to revert changes.
❌ Add notification toast messages for successfully adding, updating, and deleting expenses
❌ add end of week/month recaps
❌ add user settings where they can choose custom emojis for categories, revert confirmation popup settings
❌ export to pdf/excel
❌ powerbi dashboard style ui 
❌ Create repository layer which talks to db
❌ add middleware OR refresh endppint which refreshes token on every api request so user never redirected to login if they are using app. only way they redirected is if inactive ( no http requests ) for 60 mins. use docs to learn proper way , ai is confused


💡 Development Ideas:
❌ Be less dependent on notifications, instead highlight newly added changes momentarily. dont break flow
❌ Smart categorisation
❌ learn git add p
❌ Use azure devops free tier and use azure devops MCP to create stories for all of below on my personal account
❌ Use playwright mcp for writing acceptance tests
❌ Generate monthly develop reports to review achievements
❌ Instead of storing secret using user secrets (local), use azure key vault and add there.
❌ Make commits trigger a pipeline which automatically runs tests

✨ Cool features to implement:
❌ Dashboard with cards
❌ Paste bank transaction parser
❌ Add weekly/monthly summary of expenses, as a story.
❌ Pie charts for categories to visualise spending
❌ Monthly budget + warnings
❌ Recurring expenses detection
❌ Frictionless input. Inline quick add -> £12.50 coffee -> parses into amount + category + name. Massively reduces friction
❌ "Where did my money go?" . Biggest category this month. Biggest increase vs last month. Top 3 merchants.
❌ Month to month comparison. % increase/decrease per category. 
❌ Spending anomalies. Unusually large transactions. Unusual category spend.
❌ Financial health score. Score based on budget adherence, savings rate, expense volatility. Explain why the score changed. 
❌ Regret tagging. User mark expense as thumbs up (worth it), neutral (meh face), thumbs down (regret). Over time, show stats on regret vs non-regret purchases.
You regretted 5 purchases at Pret last month (£38).
❌ "Invisible money" view. Small-recurring expenses. Sub-£5 purchases. You spent £127 on purchases under £5. Insightful and surprising
❌ Voice input for adding expenses. Can do lots in one go.
❌ Reports -> export as pdf, excel etc. Date-locked summaries. 
❌ Financial seasons -> Let users label months as "Holiday season", "Wedding season". Insights become fairer and smarter
❌ Attach notes to months -> "Moved house" "Started new job". When revisiting old data, context helps understand spending
❌ natural language queries -> how much did i spend on food last month
❌ predictive expenses. cof -> coffee 3.40

LEARNING:
- learnt what CORS is
- confusing methods, add bunch of comments. use feynam technique. rewrite it until its perfect.



✅ DONE:
✅ Create CRUD Operations on backend
✅ add admin UI and separate endpoint and separate admin expense dto potentially
✅ Create shared components folder 
✅ Allow CRUD Operations on frontend
✅ Utilise DTOs instead of domain objects in endpoints, e.g. CreateExpenseDto, UpdateExpenseDto
✅ use automapper
✅ add created at date for ex.Expenses
✅ rename components to use angular19+ version (e.g. remove .component. from home.component.html)
✅ add toast for signup success
✅ add JWT authetnciation, login, signup etc
✅ migrate categories
✅ Added category keywords to database and added new clothing category

this is a test to see if I can commit from phone


test 


Learning notes:

- unit tests: call controller methods directly. Test business logic in isolation. Very fast. Write lots, and cover all edge-cases.
var controller = new AuthController(db, config);
var response = await controller.SignUp(dto); // Direct method call

- integration tests: test full HTTP pipeline (request → routing → validation → controller → response). Slower than unit tests, so write fewer - only for critical paths.
Integration tests test that all the pieces work together correctly.
var client = new HttpClient();
var response = await client.PostAsync("/auth/signup", jsonContent); // Real HTTP request


####### setup instructions #####

- need hugging face api key for smart categorisation
- need jwt token for auth
