using Core.Entities;
using Core.Interfaces;
using Core.Specification;

using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IGenericRepository<Product> repo) : ControllerBase
{
    

    
    
    
    
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string? color, string? model, string? sort)
    {
        var spec = new ProductSpecification(color, model, sort);
        var products = await repo.ListAsync(spec);
        return Ok(products);
    }

    [HttpGet("Colors")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetColors()
    {
        var spec = new ColorListSpecification();
        var colors = await repo.ListAsync<string>(spec);
        return Ok(colors);
    }

    [HttpGet("Models")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetModels()
    {
        var spec = new ModelListSpecification();
        var models = await repo.ListAsync<string>(spec);
        return Ok(models);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);
        if (product == null)
            return NotFound();
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        repo.Add(product);
        if(await repo.SaveAllAsync()) 
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        
        return BadRequest("Failed to create product");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (product.Id != id || !ProductExists(id))
            return BadRequest("Cannot update this product");
        
        repo.Update(product);
        if(await repo.SaveAllAsync()) return NoContent();
        return BadRequest("Failed to update product");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);
        if (product == null) return NotFound();
        
        repo.Delete(product);
        if(await repo.SaveAllAsync()) return NoContent();
        return BadRequest("Failed to delete product");
    }
    
    
    
    
    //metodo auxiliar
    
    public bool ProductExists(int id)
    {
        return repo.Exists(id);
    }
}