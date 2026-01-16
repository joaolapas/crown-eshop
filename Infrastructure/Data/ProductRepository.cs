using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository(StoreContext context) : IProductRepository
{


    public async Task<IReadOnlyList<Product>> GetProductsAsync(string? color, string? model, string? sort)
    {
        var query = context.Products.AsQueryable();
        if(!string.IsNullOrWhiteSpace(color))
            query = query.Where(x => x.Color.Contains(color));
        if(!string.IsNullOrWhiteSpace(model))
            query = query.Where(x => x.Model == model);
        query = sort switch
        {
            "priceAsc" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
        
        
        return await query.ToListAsync();
    }

    public async Task<IReadOnlyList<string>> GetColorsAsync()
    {
        return await context.Products.Select(x => x.Color)
            .Distinct()
            .ToListAsync();
    }

    public async Task<IReadOnlyList<string>> GetModelsAsync()
    {
        return await context.Products.Select(x => x.Model)
            .Distinct()
            .ToListAsync();
    }

    public async Task<Product?> GetProductAsync(int id)
    {
        return await context.Products.FindAsync(id);
    }

    public void AddProduct(Product product)
    {
        context.Products.Add(product);
    }

    public void UpdateProduct(Product product)
    {
        context.Entry(product).State = EntityState.Modified;
    }

    public void DeleteProduct(Product product)
    {
       context.Products.Remove(product);
    }

    public bool ProductExists(int id)
    {
        return context.Products.Any(x => x.Id == id);
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}