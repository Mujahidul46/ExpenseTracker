export const CATEGORY_MAP = {
    'Eating Out': 1,
    'Groceries': 2,
    'Transportation': 3,
    'Housing': 4,
    'Utilities': 5,
    'Healthcare': 6,
    'Clothing': 7,
    'Shopping': 8,
    'Entertainment': 9,
    'Education': 10,
    'Personal Care': 11,
    'Travel': 12,
    'Insurance': 13,
    'Subscription': 14,
    'Financial': 15,
    'Family': 16,
    'Pets': 17,
    'Gifts': 18,
    'Donations': 19,
    'Other': 20,
}

export const CATEGORY_NAMES = Object.keys(CATEGORY_MAP);


// revised category list. way more accurate.
// {
//   "expenseName": "test",
//   "categories": [
//     "Eating Out (restaurant, cafe, coffee, tea, takeaway, fast food)",
//     "Groceries (supermarket, food shopping, tesco, asda, aldi, bread, milk, eggs, fruit, vegetables)",
//     "Transportation (bus, train, taxi, uber, petrol, parking)",
//     "Housing (rent, mortgage, deposit)",
//     "Utilities (electricity, gas, water, internet, phone bill)",
//     "Healthcare (doctor, dentist, pharmacy, medicine, hospital)",
//     "Clothing (clothes, tshirt, t-shirt, shirt, jeans, shoes, trainers, sneakers, nike, adidas, boots, jacket, dress, primark, zara)",
//     "Shopping (amazon, electronics, gadgets, household items)",
//     "Entertainment (cinema, movies, games, netflix, spotify, concert)",
//     "Education (books, courses, tuition, university)",
//     "Personal Care (haircut, barber, salon, skincare, makeup)",
//     "Travel (hotel, flight, airbnb, holiday, vacation)",
//     "Insurance (car insurance, home insurance, life insurance)",
//     "Subscription (membership, monthly, annual, gym, fitness)",
//     "Financial (bank fees, loan, credit card, interest)",
//     "Family (childcare, nursery, baby, kids, toys)",
//     "Pets (dog, cat, vet, pet food)",
//     "Gifts (present, birthday gift, christmas)",
//     "Donations (charity, fundraiser, tip)",
//     "Other (miscellaneous)"
//   ]
// }

// words still not correctly categorised:
// phone, chair, football