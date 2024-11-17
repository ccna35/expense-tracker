import { IExpenseItem } from "@/interfaces";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type ExpensesContextType = {
  expenses: IExpenseItem[];
  addExpense: (expense: IExpenseItem) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    expense: Pick<IExpenseItem, "title" | "amount">
  ) => void;
};

const ExpensesContext = createContext<ExpensesContextType | null>(null);

const useExpenseContext = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within a ExpenseProvider");
  }
  return context;
};

const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<IExpenseItem[]>([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ]);

  const addExpense = (expense: IExpenseItem) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  const updateExpense = (
    id: string,
    expense: Pick<IExpenseItem, "title" | "amount">
  ) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...expense,
          };
        }
        return item;
      });
    });
  };

  const value = useMemo(
    () => ({ expenses, addExpense, deleteExpense, updateExpense }),
    [expenses]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export { useExpenseContext, ExpenseProvider };
