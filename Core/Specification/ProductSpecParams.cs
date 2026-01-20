namespace Core.Specification;

public class ProductSpecParams
{
    private List<string> _colors = [];
    private List<string> _models = [];
    public string? Sort { get; set; }
    public List<string> Colors
    {
        get => _colors;
        set
        {
            _colors = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
    
    public List<string> Models
    {
        get => _models;
        set
        {
            _models = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
    private const int MaxPageSize = 50;
    public int PageIndex { get; set; } = 1;
    private int _pageSize { get; set; } = 6;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    private string? _search;
    public string? Search
    {
        get => _search ?? "";
        set => _search = value.ToLower();
    }
}