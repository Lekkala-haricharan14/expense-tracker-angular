import { Transaction } from '../models/transaction';

export function filterByCycle(
  data: Transaction[],
  cycle: 'monthly' | 'quarterly' | 'yearly'
): Transaction[] {
  const now = new Date();

  return data.filter(t => {
    const d = new Date(t.date);

    if (cycle === 'monthly') {
      return d.getMonth() === now.getMonth() &&
             d.getFullYear() === now.getFullYear();
    }

    if (cycle === 'quarterly') {
      return Math.floor(d.getMonth() / 3) === Math.floor(now.getMonth() / 3) &&
             d.getFullYear() === now.getFullYear();
    }

    return d.getFullYear() === now.getFullYear();
  });
}
