using System.Diagnostics;
using System.Xml.Xsl;
using Core.Entities;

namespace Core.Specification;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(string? color, string? model, string? sort) : base(x =>
        (string.IsNullOrWhiteSpace(color) || x.Color == color) &&
        (string.IsNullOrWhiteSpace(model) || x.Model == model))
    {
        switch (sort)
        {
            case "priceAsc":
                AddOrderBy(x => x.Price);
                break;
            case "priceDesc":
                AddOrderByDescending(x => x.Price);
                break;
            default:
                AddOrderBy(x => x.Name);
                break;
        }

        
    }

}