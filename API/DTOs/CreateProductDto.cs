using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateProductDto
{
    [Required] 
    public String Name { get; set; } = string.Empty;
    [Required]
    public String Description { get; set; } = string.Empty;
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }
    [Required]
    public String PictureUrl { get; set; } = string.Empty;
    [Required]
    public String Model { get; set; } = string.Empty;
    [Required]
    public String Color { get; set; } = string.Empty;
    [Range(1, int.MaxValue, ErrorMessage = "Stock must be greater than 1")]
    public int QuantityInStock { get; set; }
}