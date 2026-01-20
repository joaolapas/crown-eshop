using Core.Entities;

namespace Core.Specification;


public class ColorListSpecification : BaseSpecification<Product, string>
{
    public ColorListSpecification() 
    {
        AddSelect(x=>x.Color);
        ApplyDistinct();
    }
}