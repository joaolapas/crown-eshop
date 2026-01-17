using Core.Entities;

namespace Core.Specification;

public class ModelListSpecification : BaseSpecification<Product, string>
{
    public ModelListSpecification() 
    {
        AddSelect(x=>x.Model);
        ApplyDistinct();
    }
}