using AutoMapper;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Expense, ExpenseDto>().ReverseMap();
        }
    }
}
