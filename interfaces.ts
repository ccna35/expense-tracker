export interface IExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface ICategoryItem {
  id: string;
  categoryName: string;
  createdAt: Date;
}
