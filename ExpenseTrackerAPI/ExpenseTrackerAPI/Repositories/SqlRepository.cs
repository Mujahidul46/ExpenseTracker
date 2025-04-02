
using ExpenseTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Repositories
{
    public class SqlRepository<T> : IRepository<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T> _dbSet;
        public SqlRepository(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public void AddItem(T thingToAdd)
        {
            _dbSet.Add(thingToAdd);
            _context.SaveChanges();
        }

        public bool DeleteItemWithId(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
            {
                return false;
            }
            _dbSet.Remove(entity);
            _context.SaveChanges();
            return true;
        }

        public List<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            var entity = _dbSet.Find(id);
            return entity; // its fine if null here, handled in controller
        }

        public bool UpdateItemWithId(int id, T newValues)
        {
            var entity = _dbSet.Find(id);
            if (entity == null) return false; // isValidId = false
            else
            {
                _context.Entry(entity).CurrentValues.SetValues(newValues);
                _context.SaveChanges();
                return true; // isValidId = true
            }
            
        }
    }
}
