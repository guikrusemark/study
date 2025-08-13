### **🚀 Your First Task: Data Modeling**

Let's begin. Before you write any other code, your task is to define the core data structures for this application using Zod.

Please create a file at `/src/lib/schemas.ts` and define the following Zod schemas:

* `UserSchema`: What defines a user who can log in? (e.g., `name`, `email`, `password` hash, `role`).
* `PersonSchema`: You mentioned a "person" can be a single user. How does a `Person` relate to a `User`? Does a `Person` have more details like a physical address or a national ID number? Let's clarify this relationship. For now, let's assume a `User` *is* a `Person` and we can merge them, or that a `Person` is a profile linked to a `User`.
* `BankAccountSchema`: What are the properties of a bank account? (e.g., `accountNumber`, `balance`, `currency`, and importantly, an `ownerId` linking it to a `Person` or `User`).
* `TransactionSchema`: What defines a transfer? (e.g., `fromAccountId`, `toAccountId`, `amount`, `timestamp`, `status`).
* `StockSchema`: What defines a stock in our simple market? (e.g., `tickerSymbol`, `companyName`, `currentPrice`).
* `PortfolioItemSchema`: How do you represent a user's ownership of a stock? (e.g., `ownerId`, `stockId`, `quantity`).

Present me with your initial Zod schemas in that file. We will review and refine them together before moving to the next step. This foundational work will pay massive dividends in project clarity and stability.

---