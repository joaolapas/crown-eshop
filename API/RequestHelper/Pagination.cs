namespace API.RequestHelper;

public class Pagination<T>(int psgeIndex, int pageSize, int count, IReadOnlyList<T> data)
{
    public int PageIndex { get; set; } = psgeIndex;
    public int PageSize { get; set; } = pageSize;
    public int Count { get; set; } = count;
    public IReadOnlyList<T> Data { get; set; } = data;
}