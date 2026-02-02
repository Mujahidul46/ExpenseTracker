-- Updating expense categories in ex.Categories and remapping ex.Expenses accordingly

BEGIN TRANSACTION;

-- First, insert temporary categories
SET IDENTITY_INSERT ex.Categories ON;

INSERT INTO ex.Categories (Id, Name, Icon) VALUES
(1000, 'TEMP_FOOD', N'🍽️'),
(1001, 'TEMP_TRANSPORT', N'🚗'),
(1002, 'TEMP_ENTERTAINMENT', N'🎬'),
(1003, 'TEMP_OTHER', N'📦'),
(1004, 'TEMP_SUBSCRIPTION', N'📋');

SET IDENTITY_INSERT ex.Categories OFF;

-- Now update expenses to temporary IDs
UPDATE ex.Expenses SET CategoryId = 1000 WHERE CategoryId = 1; -- Food
UPDATE ex.Expenses SET CategoryId = 1001 WHERE CategoryId = 2; -- Transport
UPDATE ex.Expenses SET CategoryId = 1002 WHERE CategoryId = 3; -- Entertainment
UPDATE ex.Expenses SET CategoryId = 1003 WHERE CategoryId = 4; -- Other
UPDATE ex.Expenses SET CategoryId = 1004 WHERE CategoryId = 5; -- Subscription

-- Delete old categories
DELETE FROM ex.Categories WHERE Id BETWEEN 1 AND 5;

-- Insert all new categories
SET IDENTITY_INSERT ex.Categories ON;

INSERT INTO ex.Categories (Id, Name, Icon) VALUES
(1, 'Eating Out', N'🍽️'),
(2, 'Groceries', N'🛒'),
(3, 'Transportation', N'🚗'),
(4, 'Housing', N'🏠'),
(5, 'Utilities', N'💡'),
(6, 'Healthcare', N'🏥'),
(7, 'Shopping', N'🛍️'),
(8, 'Entertainment', N'🎬'),
(9, 'Education', N'🎓'),
(10, 'Personal Care', N'💇'),
(11, 'Travel', N'✈️'),
(12, 'Insurance', N'🛡️'),
(13, 'Subscription', N'📋'),
(14, 'Financial', N'💳'),
(15, 'Family', N'👨‍👩‍👧'),
(16, 'Pets', N'🐾'),
(17, 'Gifts', N'🎁'),
(18, 'Donations', N'❤️'),
(19, 'Other', N'📦');

SET IDENTITY_INSERT ex.Categories OFF;

-- Map old expenses to new category IDs
UPDATE ex.Expenses SET CategoryId = 1 WHERE CategoryId = 1000; -- Food -> Eating Out
UPDATE ex.Expenses SET CategoryId = 3 WHERE CategoryId = 1001; -- Transport -> Transportation
UPDATE ex.Expenses SET CategoryId = 8 WHERE CategoryId = 1002; -- Entertainment -> Entertainment
UPDATE ex.Expenses SET CategoryId = 19 WHERE CategoryId = 1003; -- Other -> Other
UPDATE ex.Expenses SET CategoryId = 13 WHERE CategoryId = 1004; -- Subscription -> Subscription

-- Remove temporary categories
DELETE FROM ex.Categories WHERE Id >= 1000;

-- Verify the results
SELECT * FROM ex.Categories ORDER BY Id;
SELECT TOP 20 e.Name, e.Amount, c.Name as CategoryName FROM ex.Expenses e JOIN ex.Categories c ON e.CategoryId = c.Id;

-- If everything looks good, run: COMMIT;
-- If something went wrong, run: ROLLBACK;
COMMIT;
-- ROLLBACK;
