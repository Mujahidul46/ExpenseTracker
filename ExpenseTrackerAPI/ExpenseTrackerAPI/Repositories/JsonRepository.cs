
using Microsoft.EntityFrameworkCore.Storage.Json;
using Newtonsoft.Json;

namespace ExpenseTrackerAPI.Repositories
{
    public class JsonRepository<T> : IRepository<T> where T : class
    {
        private string _filePath;
        public JsonRepository(string filePath)
        {
            _filePath = filePath;
        }
        public void AddItem(T thingToAdd)
        {
            throw new NotImplementedException();
        }

        public bool DeleteItemWithId(int id)
        {
            throw new NotImplementedException();
        }

        public List<T> GetAll()
        {
            if(!File.Exists(_filePath))
            {
                return new List<T>();
            }
            var jsonData = File.ReadAllText(_filePath);

            List<T> deserializedList = JsonConvert.DeserializeObject<List<T>>(jsonData);

            if (deserializedList == null)
            {
                return new List<T>();
            }

            return deserializedList;
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateItemWithId(int id, T thingToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
