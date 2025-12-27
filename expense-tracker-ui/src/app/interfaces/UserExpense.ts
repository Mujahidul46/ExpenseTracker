export interface UserExpense {
    id: number;
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    categoryName: string;
    categoryIcon: string;
    userName: string;
    userEmail: string;
}