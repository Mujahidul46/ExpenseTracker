export interface AdminExpense {
    id: number;
    name: string;
    amount: number;
    categoryId: number;
    userId: number;
    categoryName: string;
    userName: string;
    userEmail: string;
}