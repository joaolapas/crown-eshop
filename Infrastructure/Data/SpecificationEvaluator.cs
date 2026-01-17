using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec)
    {
        if(spec.Criteria != null)
            inputQuery = inputQuery.Where(spec.Criteria);
        if (spec.OrderBy != null)
            inputQuery = inputQuery.OrderBy(spec.OrderBy);
        if (spec.OrderByDescending != null)
            inputQuery = inputQuery.OrderByDescending((spec.OrderByDescending));
        
        
        return inputQuery;

        
    }
    
    
    //overload
    public static IQueryable<TResult> GetQuery<TSpec,TResult>(IQueryable<T> inputQuery, ISpecification<T, TResult> spec)
    {
        
        var selectQuery = inputQuery as IQueryable<TResult>;
        if(spec.Select != null)
            selectQuery = inputQuery.Select((spec.Select));
        if (spec.IsDistinct)
            selectQuery = selectQuery.Distinct();
        
        return selectQuery ?? inputQuery.Cast<TResult>();

        
    }
    
}