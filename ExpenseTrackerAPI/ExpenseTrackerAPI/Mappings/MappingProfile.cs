using AutoMapper;
using ExpenseTrackerAPI.Dtos;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Mappings {
    public class MappingProfile : Profile {
        
        public MappingProfile() {
            // Expense -> ExpenseDto
            CreateMap<Expense, ExpenseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.CategoryIcon, opt => opt.MapFrom(src => src.Category.Icon));
        }
        
    }


}