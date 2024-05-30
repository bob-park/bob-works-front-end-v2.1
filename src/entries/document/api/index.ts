export async function getUsage() {
  const response = await fetch('/api/document/vacation/usage', {
    method: 'get',
    next: {
      tags: ['document', 'vacation', 'usage'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response
    .json()
    .then((res: UsageVacation[]) =>
      res.sort((o1, o2) =>
        o1.vacationDateFrom > o2.vacationDateFrom ? 1 : -1,
      ),
    );
}
