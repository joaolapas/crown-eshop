using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync(string? color, string? model, string? sort);
    Task<IReadOnlyList<string>> GetColorsAsync();
    Task<IReadOnlyList<string>> GetModelsAsync();
    Task<Product?> GetProductAsync(int id);
    void AddProduct(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(Product product);
    bool ProductExists(int id);
    Task<bool> SaveAsync();
}