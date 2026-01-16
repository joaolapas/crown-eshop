using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductRepository repo) : ControllerBase
{
    

    
    
    
    
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string? color, string? model, string? sort)
    {
        return Ok(await repo.GetProductsAsync(color, model, sort));
    }

    [HttpGet("Colors")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetColors()
    {
        return Ok(await repo.GetColorsAsync());
    }
    
    [HttpGet("Models")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetModels()
    {
        return Ok(await repo.GetModelsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await repo.GetProductAsync(id);
        if (product == null)
            return NotFound();
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        repo.AddProduct(product);
        if(await repo.SaveAsync()) 
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        
        return BadRequest("Failed to create product");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (product.Id != id || !ProductExists(id))
            return BadRequest("Cannot update this product");
        
        repo.UpdateProduct(product);
        if(await repo.SaveAsync()) return NoContent();
        return BadRequest("Failed to update product");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await repo.GetProductAsync(id);
        if (product == null) return NotFound();
        
        repo.DeleteProduct(product);
        if(await repo.SaveAsync()) return NoContent();
        return BadRequest("Failed to delete product");
    }
    
    
    
    
    //metodo auxiliar
    
    public bool ProductExists(int id)
    {
        return repo.ProductExists(id);
    }
}