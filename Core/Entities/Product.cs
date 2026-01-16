namespace Core.Entities;

public class Product: BaseEntity
{
    public required String Name { get; set; }
    public required String Description { get; set; }
    public required decimal Price { get; set; }
    public required String PictureUrl { get; set; }
    public required String Model { get; set; }
    public required String Color { get; set; }
    public required int QuantityInStock { get; set; }
}