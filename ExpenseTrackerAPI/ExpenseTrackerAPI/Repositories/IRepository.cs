using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Repositories
{
    public interface IRepository<T> where T : class
    {
        List<T> GetAll();
        T GetById(int id);
        void AddItem(T thingToAdd);
        bool UpdateItemWithId(int id, T thingToUpdate);
        bool DeleteItemWithId(int id);
    }
}
